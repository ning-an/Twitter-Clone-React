import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { SpanInfo } from "./PersonalInfo";
import { likeTweet, retweetTweet } from "../helpers/apiHelpers";
import LikeButton from "./ActionButton";
import TweetActionIcon from "./ActionButton/TweetActionIcon";
import { fetchTweetInfo } from "../helpers/apiHelpers";

const ActionBar = ({ id }) => {
  const [like, setLike] = useState(false);
  const [retweet, setRetweet] = useState(false);
  const [tweet, setTweet] = useState(null);

  useEffect(() => {
    fetchTweetInfo(id).then((data) => setTweet(data));
  }, [like, retweet]);

  if (tweet) {
    const { isLiked, isRetweeted, numLikes, numRetweets } = tweet.tweet;
    return (
      <Wrapper>
        <BtnDiv>
          <UnstyledBtn
            color="rgb(27, 149, 224)"
            tabIndex="0"
            aria-label="Reply"
          >
            <TweetActionIcon kind="reply" />
          </UnstyledBtn>
          <SpanInfo />
        </BtnDiv>
        <BtnDiv>
          <UnstyledBtn
            color="rgb(23, 191, 99)"
            tabIndex="0"
            aria-label="Retweet"
            onClick={(e) => {
              retweetTweet(e, id, isRetweeted);
              setRetweet(!retweet);
            }}
          >
            <TweetActionIcon kind="retweet" />
          </UnstyledBtn>
          <SpanInfo>{numRetweets > 0 && numRetweets}</SpanInfo>
        </BtnDiv>
        <BtnDiv>
          <UnstyledBtn
            color="rgb(224, 36, 94)"
            tabIndex="0"
            aria-label="Like"
            onClick={(e) => {
              likeTweet(e, id, isLiked);
              setLike(!like);
            }}
          >
            <LikeButton isLiked={isLiked} />
          </UnstyledBtn>
          <SpanInfo>{numLikes > 0 && numLikes}</SpanInfo>
        </BtnDiv>
        <BtnDiv>
          <UnstyledBtn
            color="rgb(27, 149, 224)"
            tabIndex="0"
            aria-label="Share"
          >
            <TweetActionIcon kind="share" />
          </UnstyledBtn>
          <SpanInfo />
        </BtnDiv>
      </Wrapper>
    );
  } else {
    return "";
  }
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding-top: 5px;
`;

const BtnDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UnstyledBtn = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 5px;
  border: none;
  background: transparent;
  cursor: pointer;
  /* font-size: 20px; */
  outline: none;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    opacity: 0;
    background-color: ${({ color }) => color};
  }

  &:hover:after,
  &:focus:after {
    opacity: 0.12;
  }
`;

export default ActionBar;
