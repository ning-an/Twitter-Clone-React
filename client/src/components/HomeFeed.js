import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";

import { fetchHomeFeeds } from "../helpers/apiHelpers";
import {
  RequestHomeFeedsData,
  ReceiveHomeFeedsData,
  ReceiveHomeFeedsError,
} from "../actions";
import Error from "./Error";
import SmallTweet from "./SmallTweet";
import { Image, SpanInfo } from "./PersonalInfo";
import { COLORS } from "../constants";
import { postTweet } from "../helpers/apiHelpers";
import { EditPost, PostPost, PostError } from "../actions";
import { FiLoader } from "react-icons/fi";

const HomeFeed = () => {
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState(false);

  useEffect(() => {
    dispatch(RequestHomeFeedsData());

    fetchHomeFeeds()
      .then((data) => dispatch(ReceiveHomeFeedsData(data)))
      .catch((err) => {
        console.log("there is error");
        dispatch(ReceiveHomeFeedsError(err));
      });
  }, [newPost]);

  const { homeFeeds, status } = useSelector((state) => state.homeFeeds);
  const { currentUser } = useSelector((state) => state.user);
  const { value: postValue, error } = useSelector((state) => state.newPost);

  return (
    <Wrapper>
      <h2>Home</h2>
      <div>
        <InputArea>
          <Image src={currentUser.avatarSrc} alt={currentUser.handle} />
          <textarea
            type="text"
            placeholder="What's happening?"
            value={postValue}
            onChange={(e) => dispatch(EditPost(e.target.value))}
          ></textarea>
        </InputArea>
        <PostDiv>
          <WordCount wordLeft={280 - postValue.length}>
            {280 - postValue.length}
          </WordCount>
          <PostBtn
            disabled={
              (postValue.length > 280 || postValue.length === 0) && "disabled"
            }
            onClick={() => {
              postTweet(postValue)
                .then(() => dispatch(PostPost()))
                .catch(() => dispatch(PostError()));
              setNewPost(!newPost);
            }}
          >
            Post
          </PostBtn>
        </PostDiv>
        {status === "success" && !error ? (
          homeFeeds.tweetIds.map((id) => {
            return <SmallTweet key={id} tweetId={id} feeds={homeFeeds} />;
          })
        ) : status === "loading" ? (
          <LoadingBtn>
            <FiLoader style={{ fontSize: "30px" }} />
          </LoadingBtn>
        ) : (
          <Error />
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  border: solid lightgrey 1px;
  box-shadow: 0 8px 1px 1px lightgrey;
  width: 100%;
  min-height: 100vh;
  /* overflow: hidden; */

  h2 {
    border: solid lightgrey 1px;
    height: 30px;
    padding-left: 20px;
    font-size: 24px;
  }
`;

const InputArea = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;

  img {
    flex: none;
    width: 60px;
  }

  textarea {
    flex: auto;
    height: 100px;
    border: none;
    margin-left: 20px;
    padding: 5px;
    font-size: 16px;
  }
`;

const PostDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 20px;
`;

const WordCount = styled(SpanInfo)`
  color: ${({ wordLeft }) =>
    wordLeft > 55 ? "lightgrey" : wordLeft > 0 ? "yellow" : "red"};
`;

const PostBtn = styled.button`
  border-radius: 20px;
  background-color: ${COLORS.primary};
  color: ${COLORS.secondary};
  padding: 5px 20px;
  margin-left: 20px;
  border: none;
  outline: none;
  font-size: 18px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`;

const spin = keyframes`
from {transform: rotate(0deg)}
to {transform: rotate(360deg)}
`;
const LoadingBtn = styled.button`
  position: absolute;
  top: 300px;
  left: 50%;
  border: none;
  background: none;
  animation: ${spin} 1s linear infinite;
`;

export default HomeFeed;
