import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Spin } from "antd";
import {
  CopyOutlined,
  LinkOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button } from "../../atoms/buttons";
import { Heading } from "../../atoms/typography/heading";
import { Paragraph } from "../../atoms/typography/paragraph";
import { useCompanyContext } from "../../../HOC/contexts/CompanyContext/useCompanyContext";
import { useAuthContext } from "../../../HOC/contexts/General/AuthContext/useAuthContext";
import {
  getCompanyTeamApi,
  generateTeamInviteApi,
} from "../../../api/userApi/userApi";
import { handlePrivateApiError } from "../../../api/errorHandler";
import type { ICommonApiError } from "../../../api/errorHandler";
import type { ITeamMember } from "../../../api/userApi/types";
import { toast } from "../../../utils/toast";

const TeamMembersPage: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();
  const { company } = useCompanyContext();
  const { user, onLogout } = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState<ITeamMember | null>(null);
  const [members, setMembers] = useState<ITeamMember[]>([]);
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const isOwner = company?.creatorUserId === user?._id;

  const getCompanyTeamApiAction = useCallback(async () => {
    if (!userName) return;
    setLoading(true);
    try {
      const res = await getCompanyTeamApi(userName);
      setOwner(res.data.owner);
      setMembers(res.data.members);
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to load team members");
    } finally {
      setLoading(false);
    }
  }, [userName, onLogout]);

  useEffect(() => {
    getCompanyTeamApiAction();
  }, [getCompanyTeamApiAction]);

  const generateTeamInviteApiAction = async () => {
    if (!userName) return;
    setGenerating(true);
    try {
      const res = await generateTeamInviteApi(userName);
      setInviteUrl(res.data.url);
    } catch (err) {
      const { error, data } = handlePrivateApiError(
        err as ICommonApiError,
        onLogout,
      );
      toast.error(data?.message || error || "Failed to generate invite link");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyLink = () => {
    if (!inviteUrl) return;
    navigator.clipboard.writeText(inviteUrl);
    toast.success("Link copied to clipboard");
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Heading $level={4}>Team Members</Heading>

      <div className="rounded-2xl border border-borders-light-1 bg-white p-6 space-y-6">
        {owner && (
          <div>
            <Paragraph
              $level={5}
              $typographyPalette="subtitle"
              className="!mb-3"
            >
              Owner
            </Paragraph>
            <div className="flex items-center gap-3">
              <Avatar icon={<UserOutlined />} src={owner.profilePicture} />
              <div>
                <Paragraph $level={5} className="!mb-0 font-medium">
                  {owner.name || "Unknown"}
                </Paragraph>
                <Paragraph
                  $level={5}
                  $typographyPalette="subtitle"
                  className="!mb-0"
                >
                  {owner.email}
                </Paragraph>
              </div>
            </div>
          </div>
        )}

        {members.length > 0 && (
          <div>
            <Paragraph
              $level={5}
              $typographyPalette="subtitle"
              className="!mb-3"
            >
              Members
            </Paragraph>
            <div className="space-y-3">
              {members.map((member) => (
                <div key={member._id} className="flex items-center gap-3">
                  <Avatar
                    icon={<UserOutlined />}
                    src={member.profilePicture}
                  />
                  <div className="flex-1">
                    <Paragraph $level={5} className="!mb-0 font-medium">
                      {member.name || "Unknown"}
                    </Paragraph>
                    <Paragraph
                      $level={5}
                      $typographyPalette="subtitle"
                      className="!mb-0"
                    >
                      {member.email}
                    </Paragraph>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {members.length === 0 && (
          <Paragraph $level={5} $typographyPalette="subtitle">
            No team members yet. Invite someone using the link below.
          </Paragraph>
        )}
      </div>

      {isOwner && (
        <div className="rounded-2xl border border-borders-light-1 bg-white p-6 space-y-4">
          <Heading $level={5}>Invite Link</Heading>

          <Button
            type="outlined"
            color="primary"
            icon={<LinkOutlined />}
            loading={generating}
            onClick={generateTeamInviteApiAction}
          >
            Generate Link
          </Button>

          {inviteUrl && (
            <div className="flex items-center gap-3">
              <div className="flex-1 truncate rounded-lg border border-borders-light-1 bg-background-body-2-light-1 px-4 py-2 font-mono text-sm">
                {inviteUrl}
              </div>
              <Button
                type="outlined"
                color="primary"
                icon={<CopyOutlined />}
                onClick={handleCopyLink}
              >
                Copy
              </Button>
            </div>
          )}

          {inviteUrl && (
            <Paragraph
              $level={5}
              $typographyPalette="subtitle"
              className="!mb-0"
            >
              Link expires in 3 days. Single-use.
            </Paragraph>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMembersPage;
