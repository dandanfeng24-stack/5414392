import { AccountSubPage } from "../shared";

export default function AccountServicesPage() {
  return (
    <AccountSubPage
      currentPath="/account/services"
      eyebrow="诊断与服务记录"
      title="诊断与服务记录"
      description="你还没有诊断或服务记录。提交项目诊断需求后，后续可在这里查看相关进度。当前第一版暂未保存真实诊断或服务记录。"
      action={{ label: "提交项目诊断", href: "/diagnosis" }}
      cards={[
        ["暂无诊断记录", "当前不会制造假诊断记录，也不会接入后台、CRM 或邮件通知。"],
        ["可先提交需求", "进入项目诊断页填写项目情况，用于后续人工沟通和初步判断。"],
        ["后续扩展方向", "未来接入真实服务流程后，再在这里展示诊断状态、沟通记录和交付节点。"]
      ]}
    />
  );
}
