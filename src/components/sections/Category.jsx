import { ArrowUpRight } from 'lucide-react'
import './Work.css'
import './Category.css'

/**
 * 一个作品板块 = 大标题 + 导语 + 整宽主推卡 + 参与项目清单。
 * 结构沿用原先「精选项目」那套卡片样式（Work.css），只是每个大类各占一块。
 */
function Meta({ label, value }) {
  return (
    <div className="work-item__meta">
      <span className="work-item__meta-k">{label}</span>
      <span className="work-item__meta-v">{value}</span>
    </div>
  )
}

export default function Category({ data }) {
  const item = data.featured

  return (
    <section className="section work cat" id={data.id}>
      <div className="shell">
        <div className="section-head">
          <div className="section-head__left">
            <span className="eyebrow" data-reveal>
              {data.en}
            </span>
            <h2 className="section-title" data-reveal style={{ '--reveal-delay': '60ms' }}>
              {data.cn}
              <br />
              <span className="work__title-sub">{data.sub}</span>
            </h2>
          </div>
          <p className="section-lead" data-reveal style={{ '--reveal-delay': '120ms' }}>
            {data.lead}
          </p>
        </div>

        {/* 主推案例：整宽大卡片 */}
        <a
          className="card work-feature"
          href="#contact"
          data-reveal
          aria-label={`查看案例：${item.title}`}
        >
          <div className="work-feature__media">
            <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
            <span className="work-feature__badge">{data.cn}</span>
            <span className="work-feature__hover">
              <ArrowUpRight size={20} strokeWidth={1.6} />
            </span>
          </div>

          <div className="work-feature__body">
            <div className="work-feature__head">
              <span className="idx">{data.index}</span>
              <div className="work__tags">
                {item.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <h3 className="work-feature__title">{item.title}</h3>
            <p className="work-feature__summary">{item.summary}</p>

            <div className="work-feature__foot">
              <div className="work-item__metas">
                <Meta label="Category" value={item.category} />
                <Meta label="Year" value={item.year} />
                {item.stats.slice(0, 1).map((s) => (
                  <Meta key={s.k} label={s.k} value={s.v} />
                ))}
              </div>

              <ul className="work-feature__stats">
                {item.stats.map((s) => (
                  <li key={s.k}>
                    <b>{s.v}</b>
                    <span>{s.k}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </a>

        {/* 参与项目清单（地产广告这类以参与为主的项目） */}
        {data.credits?.length ? (
          <div className="cat__credits" data-reveal>
            <span className="cat__credits-label">参与项目 / Credits</span>
            <ol className="cat__credits-list">
              {data.credits.map((c) => (
                <li className="cat__credit" key={`${c.year}-${c.title}`}>
                  <span className="cat__credit-year">{c.year}</span>
                  <span className="cat__credit-title">{c.title}</span>
                  <span className="cat__credit-role">{c.role}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </section>
  )
}
