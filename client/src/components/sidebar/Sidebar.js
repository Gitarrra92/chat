import React from "react";

import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ListIcon from "@material-ui/icons/List";
import { IconButton } from "@material-ui/core";
import { SidebarChat } from "./SidebarChat";

import "./Sidebar.css";

export const Sidebar = ({ room, setRoom }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <ListIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search"></div>
      <div className="sidebar__chats">
        <SidebarChat room={room} />
      </div>
    </div>
  );
};
