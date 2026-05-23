import { AccountSubPage } from "../shared";

export default function AccountOrdersPage() {
  return (
    <AccountSubPage
      eyebrow="订单记录"
      title="订单记录"
      description="未来这里将展示资料包订单、会员订单和服务订单。当前版本不生成假订单，也不接入支付或订单系统。"
      cards={[
        ["资料包订单", "后续可展示资料包名称、获取状态和发票信息。"],
        ["会员订单", "后续可展示会员开通、续费和权益变更记录。"],
        ["服务订单", "后续可展示项目诊断、咨询和专项策划的服务订单。"]
      ]}
    />
  );
}
