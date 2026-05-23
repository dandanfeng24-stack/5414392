import { AccountSubPage } from "../shared";

export default function AccountServicesPage() {
  return (
    <AccountSubPage
      eyebrow="服务记录"
      title="服务记录"
      description="未来这里将展示项目诊断、咨询沟通、方案交付和服务进度。当前版本不生成假服务记录。"
      cards={[
        ["项目诊断", "后续可查看已提交项目、诊断状态和初步判断结果。"],
        ["咨询记录", "后续可展示咨询预约、沟通纪要和下一步建议。"],
        ["交付记录", "后续可展示报告、方案、资料包和交付节点。"]
      ]}
    />
  );
}
