import React from "react";

import { Image, DisplayName, SpanInfo } from "./PersonalInfo";
import moment from "moment";
import styled from "styled-components";
import ActionBar from "./ActionBar";
import { useHistory } from "react-router-dom";
import { COLORS } from "../constants";
import { AiOutlineRetweet } from "react-icons/ai";

const SmallTweet = ({ tweetId, feeds }) => {
  const { author, media, status, timestamp, retweetFrom } = feeds.tweetsById[
    tweetId
  ];

  const history = useHistory();

  const handleTweetClick = () => {
    history.push(`/tweet/${tweetId}`);
  };

  const handleTweetPress = (e) => {
    if (e.key === "Enter") {
      handleTweetClick(e);
    }
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    history.push(`/profile/${author.handle}`);
  };

  const handleProfilePress = (e) => {
    if (e.key === "Enter") {
      handleProfileClick(e);
    }
  };

  return (
    <Wrapper
      onClick={handleTweetClick}
      onKeyPress={handleTweetPress}
      tabIndex="0"
      aria-label="View Profile"
    >
      {retweetFrom && (
        <RetweetInfo>
          <SpanInfo>
            <AiOutlineRetweet />
            {author.displayName} Retweeted
          </SpanInfo>
        </RetweetInfo>
      )}
      <SubWrapper>
        <Avatar src={retweetFrom ? retweetFrom.avatarSrc : author.avatarSrc} />
        <div>
          <DisplayName
            style={{ marginRight: "10px" }}
            onClick={handleProfileClick}
            tabIndex="0"
            onKeyPress={handleProfilePress}
            aria-label="View Tweet"
          >
            {retweetFrom ? retweetFrom.displayName : author.displayName}
          </DisplayName>
          <SpanInfo>
            @{retweetFrom ? retweetFrom.handle : author.handle} -{" "}
            {moment(timestamp).format("LL")}
          </SpanInfo>
          <p>{status}</p>
          {media.length > 0 &&
            media.map((elem, index) => <PostImg key={index} src={elem.url} />)}
          <ActionBar id={tweetId} />
        </div>
      </SubWrapper>
    </Wrapper>
  );
};

const RetweetInfo = styled.div`
  margin-left: 20px;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 20px;
  border: solid lightgrey 1px;
  cursor: pointer;

  &:hover {
    border: solid ${COLORS.primary} 2px;
    border-radius: 5px;
    /* transform: scale(1.01); */
  }

  div {
    width: 90%;
  }

  p {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 95%;
  }
`;

const SubWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
`;

const Avatar = styled(Image)`
  width: 50px;
  margin-right: 10px;
`;

const PostImg = styled.img`
  border-radius: 10px;
  max-height: 300px;
  max-width: 95%;
`;

export default SmallTweet;
