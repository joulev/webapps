import { graphql } from "~/lib/gql";
export type {
  UpdateScoreMutation as UpdateScore,
  UpdateScoreMutationVariables as UpdateScoreVariables,
  UpdateProgressMutation as UpdateProgress,
  UpdateProgressMutationVariables as UpdateProgressVariables,
  UpdateStatusMutation as UpdateStatus,
  UpdateStatusMutationVariables as UpdateStatusVariables,
  UpdateRepeatMutation as UpdateRepeat,
  UpdateRepeatMutationVariables as UpdateRepeatVariables,
  AddToPtwMutation as AddToPtw,
  AddToPtwMutationVariables as AddToPtwVariables,
  RemoveFromListMutation as RemoveFromList,
  RemoveFromListMutationVariables as RemoveFromListVariables,
} from "~/lib/gql/graphql";

export const UPDATE_SCORE = graphql(/* GraphQL */ `
  mutation UpdateScore($id: Int!, $score: Float!, $advanced: [Float!]) {
    SaveMediaListEntry(id: $id, score: $score, advancedScores: $advanced) {
      score
      advancedScores
    }
  }
`);

export const UPDATE_PROGRESS = graphql(/* GraphQL */ `
  mutation UpdateProgress($id: Int!, $progress: Int!) {
    SaveMediaListEntry(id: $id, progress: $progress) {
      progress
    }
  }
`);

export const UPDATE_STATUS = graphql(/* GraphQL */ `
  mutation UpdateStatus($id: Int!, $status: MediaListStatus!) {
    SaveMediaListEntry(id: $id, status: $status) {
      status
    }
  }
`);

export const UPDATE_REPEAT = graphql(/* GraphQL */ `
  mutation UpdateRepeat($id: Int!, $repeat: Int!, $progress: Int!) {
    SaveMediaListEntry(id: $id, repeat: $repeat, progress: $progress) {
      repeat
      progress
    }
  }
`);

export const ADD_ANIME = graphql(/* GraphQL */ `
  mutation AddToPtw($mediaId: Int!) {
    SaveMediaListEntry(mediaId: $mediaId, status: PLANNING) {
      status
    }
  }
`);

export const DELETE_ANIME = graphql(/* GraphQL */ `
  mutation RemoveFromList($id: Int!) {
    DeleteMediaListEntry(id: $id) {
      deleted
    }
  }
`);
