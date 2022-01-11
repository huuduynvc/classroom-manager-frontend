import { User } from "models/User";
import React from "react";
import Divider from "@mui/material/Divider";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const ListPeople = ({
  name = "Teachers",
  listUser,
  onClickInvite,
  onClickDownload,
  onClickImportStudents,
  activeInvite = false,
}: {
  name?: string;
  listUser: User[];
  onClickInvite: (name: string) => void;
  onClickDownload?: () => void;
  onClickImportStudents?: () => void;
  activeInvite?: boolean;
}) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 10px 0 10px",
        }}
      >
        <h3 style={{ fontWeight: 500, fontSize: 25, color: "#1967d2" }}>
          {name}
        </h3>
        <div>
          {onClickImportStudents ? (
            <Tooltip title={`Import list ${name.toLowerCase()}`}>
              <IconButton
                disabled={activeInvite}
                onClick={() => {
                  if (onClickImportStudents) {
                    onClickImportStudents();
                  }
                }}
                color="primary"
                aria-label={`Import list students`}
              >
                <FileUploadIcon />
              </IconButton>
            </Tooltip>
          ) : null}
          {onClickDownload ? (
            <Tooltip title={`Download list ${name.toLowerCase()}`}>
              <IconButton
                disabled={activeInvite}
                onClick={() => {
                  if (onClickDownload) {
                    onClickDownload();
                  }
                }}
                color="primary"
                aria-label={`Download list students`}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          ) : null}
          <Tooltip title={`Invite ${name.toLowerCase()}`}>
            <IconButton
              disabled={activeInvite}
              onClick={() => onClickInvite(name)}
              color="primary"
              aria-label={`Invite ${name.toLowerCase()}`}
            >
              <GroupAddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <Divider sx={{ borderColor: "#1967d2" }} />

      <Grid container sx={{ padding: "10px 10px 0 10px" }} spacing={2}>
        {listUser.map((user) => (
          <Grid key={user.username} item xs={8} sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ marginRight: "20px" }} src={user.avatar} />
            <p>{user.username}</p>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ListPeople;
