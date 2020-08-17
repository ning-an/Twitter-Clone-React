import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

import { Image, DisplayName, SpanInfo } from "./PersonalInfo";
import ActionBar from "./ActionBar";
import Error from "./Error";

const BigTweet = () => {
  const { homeFeeds } = useSelector((state) => state.homeFeeds);
  const { tweetId } = useParams();
  if (homeFeeds) {
    const {
      id,
      author,
      isRetweeted,
      isLiked,
      media,
      numLikes,
      numRetweets,
      status,
      timestamp,
    } = homeFeeds.tweetsById[tweetId];
    return (
      <Wrapper>
        <TweetHead>
          <Avatar src={author.avatarSrc} />
          <div>
            <Link to={`/profile/${author.handle}`}>
              <DisplayName style={{ marginRight: "10px" }}>
                {author.displayName}
              </DisplayName>
            </Link>
            <div>
              <SpanInfo>@{author.handle}</SpanInfo>
            </div>
          </div>
        </TweetHead>
        <div>{status}</div>
        {media.length > 0 &&
          media.map((elem, index) => <PostImg key={index} src={elem.url} />)}
        <div>
          <SpanInfo>{moment(timestamp).format("lll")}</SpanInfo>
        </div>
        <Line />
        <ActionBar
          numLikes={numLikes}
          numRetweets={numRetweets}
          isRetweeted={isRetweeted}
          isLiked={isLiked}
          id={id}
        />
      </Wrapper>
    );
  } else {
    return <Error />;
  }
};

const Wrapper = styled.div`
  width: 100%;
  div {
    margin-bottom: 10px;
    width: 95%;
  }
`;

const TweetHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  div {
    width: 95%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const Avatar = styled(Image)`
  width: 50px;
  margin-right: 10px;
`;

const PostImg = styled.img`
  border-radius: 10px;
  width: 95%;
  margin-bottom: 10px;
`;

const Line = styled.div`
  border: lightgrey solid 1px;
`;

export default BigTweet;
