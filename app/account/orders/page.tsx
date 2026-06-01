import { PackageSampleEntryList } from "@/components/packages/PackageSampleCards";
import { packages } from "@/lib/data";
import { AccountSubPage } from "../shared";

export default function AccountOrdersPage() {
  return (
    <AccountSubPage
      currentPath="/account/orders"
      eyebrow="资料包记录"
      title="资料包记录"
      description="你还没有资料包领取记录。后续领取资料包后，可在这里查看相关记录。当前第一版暂未保存真实领取记录。"
      action={{ label: "前往资料包", href: "/packages" }}
      cards={[
        ["暂无领取记录", "当前不会显示假资料包记录，也不会写入订单或下载记录。"],
        ["可先浏览资料包", "进入资料包页面后，可以查看公开目录、样张预览和注册用户可见入口。"],
        ["后续扩展方向", "未来接入真实领取或下载记录后，再在这里展示资料包名称、状态和时间。"]
      ]}
    >
      <section className="mt-12">
        <div className="mb-5">
          <div className="text-sm text-gold">当前可查看样张</div>
          <h2 className="mt-2 font-serif text-3xl text-paper">注册用户可查看的资料包样张入口</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-linen">
            当前第一版暂不保存真实领取记录。这里先展示注册用户可查看的资料包样张入口，后续开放真实领取与记录功能后，可在此查看个人资料包记录。
          </p>
        </div>
        <PackageSampleEntryList packages={packages} />
      </section>
    </AccountSubPage>
  );
}
