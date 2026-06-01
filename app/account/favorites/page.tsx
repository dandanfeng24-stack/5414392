import { AccountSubPage } from "../shared";

export default function AccountFavoritesPage() {
  return (
    <AccountSubPage
      currentPath="/account/favorites"
      eyebrow="收藏项目"
      title="收藏项目"
      description="你还没有收藏项目。可以先前往项目库浏览非遗项目，后续收藏的项目会显示在这里。当前第一版暂未保存真实收藏。"
      action={{ label: "前往项目库", href: "/database" }}
      cards={[
        ["暂无收藏项目", "当前不会使用 localStorage 或数据库表保存收藏，也不会生成假收藏数据。"],
        ["可先浏览项目库", "进入非遗产品化数据库，按主题、场景、客群和风险筛选适合研究的项目。"],
        ["后续扩展方向", "未来接入真实收藏能力后，再在这里展示收藏项目、收藏时间和快速入口。"]
      ]}
    />
  );
}
