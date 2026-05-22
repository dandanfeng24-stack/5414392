"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type DiagnosisFormState = {
  projectName: string;
  city: string;
  projectType: string;
  heritageCategory: string;
  hasVenue: string;
  hasProduct: string;
  mainProblem: string;
  budgetRange: string;
  expectedHelp: string[];
  contactName: string;
  contactInfo: string;
  description: string;
  confirmConsent: boolean;
};

const initialState: DiagnosisFormState = {
  projectName: "",
  city: "",
  projectType: "",
  heritageCategory: "",
  hasVenue: "",
  hasProduct: "",
  mainProblem: "",
  budgetRange: "",
  expectedHelp: [],
  contactName: "",
  contactInfo: "",
  description: "",
  confirmConsent: false
};

const projectTypes = [
  "非遗传承人/工坊",
  "景区/古镇/历史街区",
  "政府文旅/平台公司",
  "文创品牌/设计机构",
  "研学机构/学校/营地",
  "文旅策划/运营公司",
  "其他"
];

const heritageCategories = [
  "传统技艺",
  "传统美术",
  "传统音乐",
  "传统舞蹈",
  "传统戏剧",
  "曲艺",
  "传统体育、游艺与杂技",
  "民俗",
  "传统医药",
  "饮食类非遗",
  "暂不确定"
];

const venueOptions = [
  "有固定场地",
  "有临时活动场地",
  "计划进入景区/街区/商场",
  "暂无场地",
  "不确定"
];

const productOptions = [
  "已有成熟产品",
  "有少量产品但销售一般",
  "有体验活动但不系统",
  "只有技艺展示",
  "暂无产品或体验"
];

const problemOptions = [
  "不知道如何产品化",
  "不知道如何定价和销售",
  "缺少年轻化表达",
  "缺少景区/街区体验内容",
  "缺少研学课程设计",
  "缺少活动和传播方案",
  "缺少招商和汇报材料",
  "不确定项目是否值得投入"
];

const budgetOptions = [
  "暂无明确预算",
  "5000元以内",
  "5000元-2万元",
  "2万元-5万元",
  "5万元-10万元",
  "10万元以上",
  "政府/企业项目，需另行沟通"
];

const expectedHelpOptions = [
  "初步商业化判断",
  "产品化方向建议",
  "景区/街区体验方案",
  "非遗研学课程设计",
  "文创产品开发建议",
  "项目汇报材料优化",
  "活动策划与传播建议",
  "深度策划咨询"
];

export function DiagnosisForm() {
  const [form, setForm] = useState<DiagnosisFormState>(initialState);
  const [submitted, setSubmitted] = useState<DiagnosisFormState | null>(null);

  function updateField(field: keyof DiagnosisFormState, value: string | boolean | string[]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleExpectedHelp(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setForm((current) => ({
      ...current,
      expectedHelp: event.target.checked
        ? [...current.expectedHelp, value]
        : current.expectedHelp.filter((item) => item !== value)
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: connect diagnosis form to Feishu / Jinshuju / email / CRM later
    setSubmitted(form);
  }

  return (
    <section id="diagnosis-form" className="mt-16 surface scroll-mt-24 rounded p-6 md:p-8">
      <h2 className="font-serif text-3xl text-paper md:text-4xl">提交项目资料</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-linen">
        请尽量填写真实项目信息。当前表单用于收集初步需求，不涉及在线支付和自动报价；提交后可根据项目情况进入进一步沟通或专项诊断。
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <FormGroup title="项目基础信息">
          <TextInput
            label="项目名称"
            name="projectName"
            required
            placeholder="例如：某县竹编非遗文创开发项目"
            value={form.projectName}
            onChange={(value) => updateField("projectName", value)}
          />
          <TextInput
            label="所在城市"
            name="city"
            required
            placeholder="例如：江西宜春 / 浙江杭州 / 四川成都"
            value={form.city}
            onChange={(value) => updateField("city", value)}
          />
          <SelectInput
            label="项目类型"
            name="projectType"
            required
            value={form.projectType}
            options={projectTypes}
            onChange={(value) => updateField("projectType", value)}
          />
          <SelectInput
            label="非遗类别"
            name="heritageCategory"
            required
            value={form.heritageCategory}
            options={heritageCategories}
            onChange={(value) => updateField("heritageCategory", value)}
          />
        </FormGroup>

        <FormGroup title="转化基础条件">
          <SelectInput
            label="是否已有场地"
            name="hasVenue"
            required
            value={form.hasVenue}
            options={venueOptions}
            onChange={(value) => updateField("hasVenue", value)}
          />
          <SelectInput
            label="是否已有产品或体验"
            name="hasProduct"
            required
            value={form.hasProduct}
            options={productOptions}
            onChange={(value) => updateField("hasProduct", value)}
          />
        </FormGroup>

        <FormGroup title="当前困难与预算">
          <SelectInput
            label="当前最大困难"
            name="mainProblem"
            required
            value={form.mainProblem}
            options={problemOptions}
            onChange={(value) => updateField("mainProblem", value)}
          />
          <SelectInput
            label="预算区间"
            name="budgetRange"
            value={form.budgetRange}
            options={budgetOptions}
            onChange={(value) => updateField("budgetRange", value)}
          />
          <div className="md:col-span-2">
            <div className="mb-3 text-xs text-paper/55">期望获得的帮助</div>
            <div className="grid gap-3 sm:grid-cols-2">
              {expectedHelpOptions.map((option) => (
                <label key={option} className="flex items-center gap-3 rounded border border-paper/10 bg-ink/45 px-4 py-3 text-sm text-linen">
                  <input
                    type="checkbox"
                    name="expectedHelp"
                    value={option}
                    checked={form.expectedHelp.includes(option)}
                    onChange={toggleExpectedHelp}
                    className="h-4 w-4 accent-[#B89A5E]"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </FormGroup>

        <FormGroup title="联系方式">
          <TextInput
            label="联系人"
            name="contactName"
            required
            value={form.contactName}
            onChange={(value) => updateField("contactName", value)}
          />
          <TextInput
            label="联系方式"
            name="contactInfo"
            required
            placeholder="请填写手机号、微信号或邮箱"
            value={form.contactInfo}
            onChange={(value) => updateField("contactInfo", value)}
          />
        </FormGroup>

        <div>
          <h3 className="mb-4 font-serif text-2xl text-paper">补充说明</h3>
          <label className="block">
            <span className="mb-2 block text-xs text-paper/55">项目补充说明</span>
            <textarea
              name="description"
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="请简要说明项目背景、已有资源、希望解决的问题或准备落地的场景"
              rows={6}
              className="w-full rounded border border-paper/15 bg-ink px-4 py-3 text-sm text-paper outline-none focus:border-gold"
            />
          </label>
        </div>

        <label className="flex items-start gap-3 rounded border border-gold/20 bg-gold/[0.05] p-4 text-sm leading-7 text-linen">
          <input
            type="checkbox"
            name="confirmConsent"
            required
            checked={form.confirmConsent}
            onChange={(event) => updateField("confirmConsent", event.target.checked)}
            className="mt-1 h-4 w-4 accent-[#B89A5E]"
          />
          我确认提交的信息用于项目初步判断和后续沟通，不涉及在线支付或自动承诺服务结果。
        </label>

        <div>
          <button type="submit" className="rounded bg-gold px-6 py-3 text-sm text-ink hover:bg-paper">
            提交诊断需求
          </button>
          <p className="mt-3 text-xs leading-6 text-linen/75">当前页面不做自动报价，具体服务内容需根据项目情况进一步沟通。</p>
        </div>
      </form>

      {submitted ? <SubmissionResult data={submitted} /> : null}
    </section>
  );
}

function FormGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-paper/10 pt-6">
      <legend className="mb-5 font-serif text-2xl text-paper">{title}</legend>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function TextInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  required
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs text-paper/55">{label}{required ? <span className="text-gold"> *</span> : null}</span>
      <input
        type="text"
        name={name}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded border border-paper/15 bg-ink px-4 py-3 text-sm text-paper outline-none focus:border-gold"
      />
    </label>
  );
}

function SelectInput({
  label,
  name,
  value,
  options,
  onChange,
  required
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs text-paper/55">{label}{required ? <span className="text-gold"> *</span> : null}</span>
      <select
        name={name}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded border border-paper/15 bg-ink px-4 py-3 text-sm text-paper outline-none focus:border-gold"
      >
        <option value="">请选择</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function SubmissionResult({ data }: { data: DiagnosisFormState }) {
  const summary = [
    ["项目名称", data.projectName],
    ["所在城市", data.city],
    ["项目类型", data.projectType],
    ["非遗类别", data.heritageCategory],
    ["已有场地", data.hasVenue],
    ["产品或体验", data.hasProduct],
    ["当前困难", data.mainProblem],
    ["预算区间", data.budgetRange || "未填写"],
    ["期望帮助", data.expectedHelp.length ? data.expectedHelp.join("、") : "未选择"],
    ["联系人", data.contactName],
    ["联系方式", data.contactInfo],
    ["补充说明", data.description || "未填写"]
  ];

  return (
    <div className="mt-8 rounded border border-gold/25 bg-gold/[0.08] p-5">
      <h3 className="font-serif text-2xl text-paper">已收到你的项目诊断需求</h3>
      <p className="mt-3 text-sm leading-7 text-linen">
        当前版本为轻量表单结构，请后续接入真实表单工具、邮箱或客户管理表。你也可以先复制表单内容，通过微信或邮箱发送给项目方。
      </p>
      <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
        {summary.map(([label, value]) => (
          <div key={label} className="rounded border border-paper/10 bg-ink/45 p-3">
            <div className="text-xs text-gold">{label}</div>
            <div className="mt-1 leading-6 text-paper/85">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
