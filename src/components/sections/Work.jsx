import { ArrowUpRight } from 'lucide-react'
import { featured, projects } from '../../data/content'
import './Work.css'

function Meta({ label, value }) {
  return (
    <div className="work-item__meta">
      <span className="work-item__meta-k">{label}</span>
      <span className="work-item__meta-v">{value}</span>
    </div>
  )
}

export default function Work() {
  return (
    <section className="section work" id="work">
      <div className="shell">
        <div className="section-head">
          <div className="section-head__left">
            <span className="eyebrow" data-reveal>
              Selected Work
            </span>
            <h2 className="section-title" data-reveal style={{ '--reveal-delay': '60ms' }}>
              精选项目
              <br />
              <span className="work__title-sub">四个长期合作里最满意的片段</span>
            </h2>
          </div>
          <p className="section-lead" data-reveal style={{ '--reveal-delay': '120ms' }}>
            品牌全案、产品界面、AI 影像与主视觉 —— 覆盖从策略到量产落地的完整链路。
            下面每个项目都能提供完整的案例复盘。
          </p>
        </div>

        {/* 主推项目：整宽大卡片 */}
        <a
          className="card work-feature"
          href="#contact"
          data-reveal
          aria-label={`查看案例：${featured.title}`}
        >
          <div className="work-feature__media">
            <img src={featured.image} alt={featured.title} loading="lazy" decoding="async" />
            <span className="work-feature__badge">FEATURED PROJECT</span>
            <span className="work-feature__hover">
              <ArrowUpRight size={20} strokeWidth={1.6} />
            </span>
          </div>

          <div className="work-feature__body">
            <div className="work-feature__head">
              <span className="idx">{featured.index}</span>
              <div className="work__tags">
                {featured.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <h3 className="work-feature__title">{featured.title}</h3>
            <p className="work-feature__summary">{featured.summary}</p>

            <div className="work-feature__foot">
              <div className="work-item__metas">
                <Meta label="Category" value={featured.category} />
                <Meta label="Year" value={featured.year} />
                {featured.stats.slice(0, 1).map((s) => (
                  <Meta key={s.k} label={s.k} value={s.v} />
                ))}
              </div>

              <ul className="work-feature__stats">
                {featured.stats.map((s) => (
                  <li key={s.k}>
                    <b>{s.v}</b>
                    <span>{s.k}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </a>

        {/* 其余项目 */}
        <div className="work-grid">
          {projects.map((p, i) => (
            <a
              className="card work-item"
              href="#contact"
              key={p.id}
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` }}
              aria-label={`查看案例：${p.title}`}
            >
              <div className="work-item__media">
                <img src={p.image} alt={p.title} loading="lazy" decoding="async" />
                <span className="work-item__hover">
                  <ArrowUpRight size={18} strokeWidth={1.6} />
                </span>
              </div>

              <div className="work-item__body">
                <div className="work-item__head">
                  <span className="idx">{p.index}</span>
                  <span className="work-item__year">{p.year}</span>
                </div>

                <h3 className="work-item__title">{p.title}</h3>
                <p className="work-item__summary">{p.summary}</p>

                <div className="work__tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="work-item__category">{p.category}</div>
              </div>
            </a>
          ))}
        </div>

        <p className="work__more" data-reveal>
          <span>更多项目与合作细节，可邮件索取完整作品集 PDF</span>
          <a className="ulink" href="#contact">
            获取完整作品集
            <ArrowUpRight size={14} strokeWidth={1.8} />
          </a>
        </p>
      </div>
    </section>
  )
}
