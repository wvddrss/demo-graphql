import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Long: any;
};

/** Object to represent a comment */
export type Comment = {
  __typename?: 'Comment';
  /** The author of the comment */
  author: Scalars['String'];
  /** The comment text */
  comment: Scalars['String'];
  /** Creation time of the comment */
  createdOn?: Maybe<Scalars['String']>;
  /** The technical id */
  id: Scalars['ID'];
  /** The talk for which the comment is made */
  talk: Talk;
};

export type CommentPageableResponse = {
  __typename?: 'CommentPageableResponse';
  /** The comments */
  content?: Maybe<Array<Maybe<Comment>>>;
  /** Information of the page */
  pageInfo: PageInfo;
};

/** Object to represent a conference */
export type Conference = {
  __typename?: 'Conference';
  /** City where the conference is held */
  city?: Maybe<Scalars['String']>;
  /** The technical id */
  id: Scalars['ID'];
  /** Name of the conference */
  name: Scalars['String'];
  /** Talks on the conference agenda */
  talks?: Maybe<Array<Talk>>;
};

/** Input type for a new Comment */
export type InputComment = {
  /** The id of the author */
  author: Scalars['String'];
  /** The comment text */
  comment: Scalars['String'];
  /** The id of the talk */
  talkId: Scalars['Long'];
};

/** Input type for a new Conference */
export type InputConference = {
  /** City where the conference is held */
  city?: InputMaybe<Scalars['String']>;
  /** Name of the conference */
  name?: InputMaybe<Scalars['String']>;
};

export type InputPage = {
  /** The requested page */
  page: Scalars['Long'];
  /** The requested size of the page */
  size: Scalars['Long'];
};

/** Input type for a new Person */
export type InputPerson = {
  /** URL to the blog */
  blog?: InputMaybe<Scalars['String']>;
  /** Github account id */
  githubAccount?: InputMaybe<Scalars['String']>;
  /** Fullname of the person */
  name?: InputMaybe<Scalars['String']>;
};

/** Input type for a new Talk */
export type InputTalk = {
  /** Short summary of the talk */
  summary?: InputMaybe<Scalars['String']>;
  /** Title of the talk */
  title?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add a new comment */
  addComment?: Maybe<Comment>;
  /** Add a new conference */
  addConference?: Maybe<Conference>;
  /** Add a new Person */
  addPerson?: Maybe<Person>;
  /** Add a speaker to a talk */
  addSpeakerToTalk?: Maybe<Talk>;
  /** Add a new Talk */
  addTalk?: Maybe<Talk>;
  /** Add a talk to a conference */
  addTalkToConference?: Maybe<Conference>;
};


export type MutationAddCommentArgs = {
  comment: InputComment;
};


export type MutationAddConferenceArgs = {
  conference: InputConference;
};


export type MutationAddPersonArgs = {
  person: InputPerson;
};


export type MutationAddSpeakerToTalkArgs = {
  speakerId?: InputMaybe<Scalars['Long']>;
  talkId?: InputMaybe<Scalars['Long']>;
};


export type MutationAddTalkArgs = {
  talk?: InputMaybe<InputTalk>;
};


export type MutationAddTalkToConferenceArgs = {
  conferenceId?: InputMaybe<Scalars['Long']>;
  talkId?: InputMaybe<Scalars['Long']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** Number of elements */
  numberOfElements: Scalars['Long'];
  /** Page number */
  pageNumber: Scalars['Long'];
  /** Size of the page */
  pageSize: Scalars['Long'];
  /** Total number of elements */
  totalElements: Scalars['Long'];
  /** Total number of pages */
  totalPages: Scalars['Long'];
};

/** Object to represent a Person */
export type Person = {
  __typename?: 'Person';
  /** URL to the blog */
  blog?: Maybe<Scalars['String']>;
  /** Github account id */
  githubAccount?: Maybe<Scalars['String']>;
  /** The technical id */
  id: Scalars['ID'];
  /** Fullname of the person */
  name: Scalars['String'];
  /** Talks given by the person */
  talks?: Maybe<Array<Talk>>;
};

export type Query = {
  __typename?: 'Query';
  /** Find a comment by id */
  comment?: Maybe<Comment>;
  /** Find comments */
  comments?: Maybe<CommentPageableResponse>;
  /** Find a conference based on the name */
  conference?: Maybe<Conference>;
  /** Find all conferences */
  conferences?: Maybe<Array<Conference>>;
  /** Find a person based by id */
  person?: Maybe<Person>;
  /** Find all persons, optional search by name */
  persons?: Maybe<Array<Person>>;
  /** Find a talk by id */
  talk?: Maybe<Talk>;
  /** Find all talks */
  talks?: Maybe<Array<Talk>>;
};


export type QueryCommentArgs = {
  id: Scalars['Long'];
};


export type QueryCommentsArgs = {
  page?: InputMaybe<InputPage>;
};


export type QueryConferenceArgs = {
  id: Scalars['Long'];
};


export type QueryConferencesArgs = {
  filter?: InputMaybe<InputConference>;
};


export type QueryPersonArgs = {
  id: Scalars['Long'];
};


export type QueryPersonsArgs = {
  filter?: InputMaybe<InputPerson>;
};


export type QueryTalkArgs = {
  id: Scalars['Long'];
};


export type QueryTalksArgs = {
  filter?: InputMaybe<InputTalk>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Subscribe to all new comments */
  comments: Comment;
};

/** Object to represent a talk */
export type Talk = {
  __typename?: 'Talk';
  /** Conferences where the talk is on the agenda */
  conferences?: Maybe<Array<Conference>>;
  /** The technical id */
  id: Scalars['ID'];
  /** Speakers of the talk */
  speakers?: Maybe<Array<Person>>;
  /** Short summary of the talk */
  summary?: Maybe<Scalars['String']>;
  /** Title of the talk */
  title: Scalars['String'];
};

export type AddConferenceMutationVariables = Exact<{
  name: Scalars['String'];
  city: Scalars['String'];
}>;


export type AddConferenceMutation = { __typename?: 'Mutation', addConference?: { __typename?: 'Conference', id: string } | null };

export type GetConferenceQueryVariables = Exact<{
  id: Scalars['Long'];
}>;


export type GetConferenceQuery = { __typename?: 'Query', conference?: { __typename?: 'Conference', id: string, name: string, city?: string | null, talks?: Array<{ __typename?: 'Talk', id: string, title: string, summary?: string | null, speakers?: Array<{ __typename?: 'Person', id: string, name: string, blog?: string | null, githubAccount?: string | null }> | null }> | null } | null };

export type GetConferencesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConferencesQuery = { __typename?: 'Query', conferences?: Array<{ __typename?: 'Conference', id: string, name: string, city?: string | null }> | null };


export const AddConferenceDocument = gql`
    mutation AddConference($name: String!, $city: String!) {
  addConference(conference: {name: $name, city: $city}) {
    id
  }
}
    `;
export type AddConferenceMutationFn = Apollo.MutationFunction<AddConferenceMutation, AddConferenceMutationVariables>;

/**
 * __useAddConferenceMutation__
 *
 * To run a mutation, you first call `useAddConferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddConferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addConferenceMutation, { data, loading, error }] = useAddConferenceMutation({
 *   variables: {
 *      name: // value for 'name'
 *      city: // value for 'city'
 *   },
 * });
 */
export function useAddConferenceMutation(baseOptions?: Apollo.MutationHookOptions<AddConferenceMutation, AddConferenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddConferenceMutation, AddConferenceMutationVariables>(AddConferenceDocument, options);
      }
export type AddConferenceMutationHookResult = ReturnType<typeof useAddConferenceMutation>;
export type AddConferenceMutationResult = Apollo.MutationResult<AddConferenceMutation>;
export type AddConferenceMutationOptions = Apollo.BaseMutationOptions<AddConferenceMutation, AddConferenceMutationVariables>;
export const GetConferenceDocument = gql`
    query GetConference($id: Long!) {
  conference(id: $id) {
    id
    name
    city
    talks {
      id
      title
      summary
      speakers {
        id
        name
        blog
        githubAccount
      }
    }
  }
}
    `;

/**
 * __useGetConferenceQuery__
 *
 * To run a query within a React component, call `useGetConferenceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConferenceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConferenceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetConferenceQuery(baseOptions: Apollo.QueryHookOptions<GetConferenceQuery, GetConferenceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConferenceQuery, GetConferenceQueryVariables>(GetConferenceDocument, options);
      }
export function useGetConferenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConferenceQuery, GetConferenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConferenceQuery, GetConferenceQueryVariables>(GetConferenceDocument, options);
        }
export type GetConferenceQueryHookResult = ReturnType<typeof useGetConferenceQuery>;
export type GetConferenceLazyQueryHookResult = ReturnType<typeof useGetConferenceLazyQuery>;
export type GetConferenceQueryResult = Apollo.QueryResult<GetConferenceQuery, GetConferenceQueryVariables>;
export const GetConferencesDocument = gql`
    query GetConferences {
  conferences {
    id
    name
    city
  }
}
    `;

/**
 * __useGetConferencesQuery__
 *
 * To run a query within a React component, call `useGetConferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConferencesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConferencesQuery(baseOptions?: Apollo.QueryHookOptions<GetConferencesQuery, GetConferencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConferencesQuery, GetConferencesQueryVariables>(GetConferencesDocument, options);
      }
export function useGetConferencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConferencesQuery, GetConferencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConferencesQuery, GetConferencesQueryVariables>(GetConferencesDocument, options);
        }
export type GetConferencesQueryHookResult = ReturnType<typeof useGetConferencesQuery>;
export type GetConferencesLazyQueryHookResult = ReturnType<typeof useGetConferencesLazyQuery>;
export type GetConferencesQueryResult = Apollo.QueryResult<GetConferencesQuery, GetConferencesQueryVariables>;