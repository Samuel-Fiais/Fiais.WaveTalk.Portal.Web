import {
  MutationMeta,
  QueryClientConfig,
  QueryMeta,
} from "@tanstack/react-query";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "../router";
import { LocationState } from "../common/LocationState";

type RequestMeta = QueryMeta | MutationMeta | undefined;

const navigate = (state: LocationState) => {
  const routerState = router.state.location.state as LocationState;

  router.navigate(".", {
    replace: true,
    state: {
      ...routerState,
      ...state,
    },
  });
};

const handleRequestSuccess = (requestMeta: RequestMeta) => {
  if (requestMeta) {
    navigate({
      toast: {
        status: "success",
        description: requestMeta.success as string,
      },
    });
  }
};

const handleRequestError = (
  requestError: unknown,
  requestMeta: RequestMeta
) => {
  if (requestError instanceof AxiosError) {
    switch (requestError.response?.status) {
      case 401:
        navigate({ authRequired: true });
        break;
      case 409:
        requestMeta?.conflict &&
          navigate({
            toast: {
              status: "error",
              description: requestMeta.conflict as string,
            },
          });
        break;
      default:
        requestMeta &&
          navigate({
            toast: {
              status: "error",
              description: requestMeta.error as string,
            },
          });
    }
  }
};

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onSuccess(_data, query) {
      handleRequestSuccess(query.meta);
    },
    onError(error, query) {
      handleRequestError(error, query.meta);
    },
  }),
  mutationCache: new MutationCache({
    onSuccess(_data, _variables, _context, mutation) {
      handleRequestSuccess(mutation.meta);
    },
    onError(error, _variables, _context, mutation) {
      handleRequestError(error, mutation.meta);
    },
  }),
};

export const queryClient = new QueryClient(queryClientConfig);
