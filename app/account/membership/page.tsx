import { AccountSubPage } from "../shared";

export default function AccountMembershipPage() {
  return (
    <AccountSubPage
      eyebrow="会员权益"
      title="会员权益"
      description="这里用于说明四层权限体系。当前版本不支持在线开通会员，不接支付，也不写入会员状态。"
      cards={[
        ["游客", "浏览公开页面、项目摘要和示例内容。"],
        ["注册用户", "后续可保存诊断记录、收藏项目和查看基础资料。"],
        ["付费用户", "后续可查看付费资料包、深度字段和会员内容。"],
        ["服务客户", "后续可查看诊断报告、顾问服务和交付记录。"]
      ]}
    />
  );
}
