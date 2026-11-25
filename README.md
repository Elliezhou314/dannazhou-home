# 周丹娜个人主页

线上地址：https://www.dannazhou.com/ （GitHub Pages + 自有域名，推送到 `main` 分支后一两分钟自动更新）

这个仓库只放个人主页。脑雾克星的网页版在另一个仓库 `elliezhou314.github.io` 里（地址 https://elliezhou314.github.io/naowu2/ ），两边互不影响，**不要把域名挂到那个仓库上**：那样会连带改掉脑雾克星的地址，手机上存的启动码和进度会丢。

纯静态页面，没有构建步骤；只有改了页面文字时需要重新生成一次字体（见下）。主页没有 JavaScript；两个作品页（`demo/platform/`、`demo/industry-map/`）共用一个几十行的轮播脚本 `js/player.js`，没有它页面照样能看（停在第一张）；经营平台作品页另有一个更小的 `js/loop.js` 管录制画面（见下）。

## 文件

| 文件 | 作用 |
|---|---|
| `index.html` | 主页：文字内容、SEO 标签（title / description / Open Graph / 结构化数据）都在这里 |
| `css/base.css` | 字体 `@font-face`、设计变量、重置、页眉、页脚、通用类 |
| `css/sections.css` | 主图区、宣言区、作品区、业务条、联系区、手机版响应式 |
| `css/work.css` | 作品页的标题区、轮播、逐张说明、全部原型网格、数据说明与原创声明 |
| `demo/platform/index.html` | 经营平台作品页：截图轮播＋逐张说明（见下文「经营平台作品页」） |
| `demo/platform/media/` | 经营平台作品页的「录制画面」：`cockpit-loop.webm`（视频）、`cockpit-loop.webp`（动态图兜底）、`cockpit-poster.webp`（封面，即视频第一帧） |
| `demo/platform/img/*.webp` | 经营平台作品页的 8 张截图，每张 1920 宽和 960 宽两种，右下角带「周丹娜原创 · 示例数据」水印 |
| `demo/industry-map/index.html` | 产业图谱原型作品页：10 张轮播＋全部 28 个原型的图文网格（见下文「产业图谱原型作品页」） |
| `demo/industry-map/img/*.webp` | 28 个原型各一张主画面，每张 1920 宽和 960 宽两种，右下角带同样的水印 |
| `js/loop.js` | 录制画面的小脚本：减少动态效果时不自动播放、只显示封面；浏览器播不了 WebM 时换成动态 WebP |
| `js/player.js` | 两个作品页共用的轮播：交叉淡入、每张停 5 秒、悬停或键盘聚焦时暂停、减少动态效果时不自动播放 |
| `art/stair.svg` | 首屏台阶与拱门插图 |
| `art/radar.svg` / `art/columns.svg` / `art/overlap.svg` / `art/network.svg` | 四件作品的插图（标讯雷达 / 经营一体化平台 / 对量工具 / 产业图谱原型） |
| `fonts/*.woff2` | 自托管字体子集：Noto Serif SC 300/400、Noto Sans SC 300/400、Jost 400/500 |
| `fonts/OFL-*.txt` | 三套字体的 SIL OFL 许可文本 |
| `tools/subset_fonts.py` | 按页面实际用到的字符生成上面的字体子集 |
| `favicon.svg` | 墨绿底、象牙色拱门图标 |
| `CNAME` | 自有域名 `www.dannazhou.com`，GitHub Pages 靠它认域名，不能删 |
| `google7f27b6b9ed64849b.html` | Google Search Console 的所有权验证文件，不能删 |
| `robots.txt` / `sitemap.xml` | 给搜索引擎的收录说明；页面有实质改动时更新 `sitemap.xml` 的 `lastmod` |
| `404.html` | 访问不存在的地址时显示 |
| `.nojekyll` | 让 GitHub Pages 原样发布文件 |

## 经营平台作品页（`demo/platform/`）

线上地址 https://www.dannazhou.com/demo/platform/ ，主页作品区「经营一体化平台」下的「查看演示」链过去。

- **只有截图、录制画面和说明**：标题下面是一段约 9 秒、循环播放的「录制画面」（指挥舱三维场景缓慢环绕，无声、无播放控件），再往下是 8 张平台截图的轮播，加逐张的文字说明。公开页面只能看、不能操作。
- **规矩：不要把平台前端代码放进本仓库。** 本仓库是公开仓库，平台的脚本、样式、三维模型、第三方库、数据文件一律不放；`demo/platform/` 下只允许 `index.html`、`img/` 里的截图和 `media/` 里的视频与图像文件（轮播与录制画面的脚本是仓库自己的 `js/player.js`、`js/loop.js`）。
- **截图怎么重新生成**：平台的可运行副本在工作副本 `E:\Claude工作区\平台演示版构建\`（不在本仓库、不入库，`web/` 是已换成虚构数据的前端）。在那里运行：

```
cd E:\Claude工作区\平台演示版构建
python -X utf8 tools/capture_showcase.py
```

  脚本自己在 `web/` 起本地静态服务（127.0.0.1、空闲端口，截完关掉），用无头浏览器按 1920×1080 截 8 个画面，等动画和数字滚动停下再截，加右下角水印（文字在 `tools/showcase_image.py` 的 `MARK`），导出两种宽度的 WebP 直接写进本仓库的 `demo/platform/img/`，原图 PNG 留在那边的 `dist/showcase-raw/`。指挥舱是自动环绕的三维画面，每次截到的视角会略有不同。截图前会隐藏平台里的「演示版」标识和数据新鲜度提示，不改平台代码。截完要逐张看一遍，并核对页面说明文字和截图对得上。
- **录制画面怎么来的、怎么重录**：不是实时录屏（本机无头浏览器是软件渲染，实时录会一卡一卡），而是逐帧录：同一个工作副本里的 `tools/record_loop.py` 在页面脚本运行前注入一个可控时钟（`tools/loop_clock.js`，接管 `performance.now`、`Date`、`requestAnimationFrame`、定时器和 CSS 动画），等场景加载、数字滚动跑完后接管时间，每次只前进 1/24 秒、渲染一帧、截一张图，所以帧距完全均匀。镜头用平台自己的运镜接口在「环域巡望」机位两侧缓慢摆过约 16°（4.5 秒），正放＋倒放拼成约 9 秒的循环，首尾速度都是 0，接缝看不出来。按 1920×1080 视口录、逐帧缩到 1280×720，加和截图一样的水印，然后在无头 Chromium 里用 WebCodecs 编成 VP9 并封装成 WebM（时间戳按帧号给定，不按真实时间），另出 960 宽、12 帧/秒的动态 WebP 和封面。重录：

```
cd E:\Claude工作区\平台演示版构建
python -X utf8 tools/record_loop.py
```

  默认直接写进本仓库的 `demo/platform/media/`；中间帧、日志（含相邻帧像素差的流畅度自检）放在那边的 `dist/loop-work/`。换一个场景只需在 `tools/loop_scenes.py` 里加一项。录完要抽几帧看一遍，确认没有空白、报错提示和真实名称。
- **改说明文字**：直接改 `demo/platform/index.html`，改完重新生成字体（见下）。说明里只写截图里看得到的内容，不写具体数字。
- 截图里的项目、单位、人名、法院、案号都是虚构写法（项目1、示例业主单位甲、律师甲、示例一区人民法院等），金额与日期是虚构的验证数值。

## 产业图谱原型作品页（`demo/industry-map/`）

线上地址 https://www.dannazhou.com/demo/industry-map/ ，主页作品区第四格「产业图谱原型」下的「查看演示」链过去。

- **只有截图和说明**：沿建筑产业链做的 28 个数字化工具原型。上面轮播 10 张（01、02、03、04、08、13、14、15、23、24），下面「全部 28 个原型」按编号排成两栏网格（手机一栏），每个原型一张图、编号、名称和一两句说明。
- **口径**：这些都是原型，画面用的是原型自带的示例数据，没有在真实业务中使用。说明文字只写截图上看得到的内容，不写准确率、节省多少这类效果数字，不写可靠性和适用范围；不出现任何公司、单位名称和内部框架说法。
- **规矩：不要把原型的代码或数据放进本仓库。** `demo/industry-map/` 下只允许 `index.html` 和 `img/` 里的截图。
- **截图怎么重新生成**：截图脚本在本仓库之外的 `E:\Claude工作区\产业图谱作品页构建\tools\`（`capture.py` 入口，`prototypes.py` 是 28 个原型各截哪个画面，`shot_image.py` 裁 16:9、加水印、导出 WebP）。原型源目录 `E:\Claude工作区\常态化工作梳理\产业图谱原型\` 只读，脚本先把各原型的页面文件夹复制到工作目录再打开，不运行原型的自检和生成脚本：

```
cd E:\Claude工作区\产业图谱作品页构建
python -X utf8 tools/capture.py --work <临时工作目录>
```

  无头浏览器、浅色主题，视口 1440×810、设备像素比 4/3（出图正好 1920×1080；原型页面内容区多在 1280～1440 宽，按 1920 视口截右边会空一大片）。右下角水印按底色自动选深色字或白字。截图前只在工作副本里改显示：04 号把页面上的本机路径改成只显示交付包文件夹名，06 号隐藏页头写着内部框架说法的副标题。截完要逐张看，核对没有真实名称，说明文字和截图对得上。只想换水印时，对原图目录重出：`python -X utf8 tools/shot_image.py <原图目录> <WebP 目录>`。
- **改说明文字**：直接改 `demo/industry-map/index.html`，改完重新生成字体（见下）。

## 域名

- 域名 `dannazhou.com` 在阿里云注册（2026-11-25），每年要续费，过期后网站地址会失效。
- 解析记录在阿里云「云解析 DNS」里：`@` 四条 A 记录指向 GitHub Pages（185.199.108.153 / 109.153 / 110.153 / 111.153），`www` 一条 CNAME 指向 `elliezhou314.github.io`。
- 网站托管在境外（GitHub），不需要 ICP 备案。

## 本地预览

直接双击 `index.html` 用浏览器打开即可。

## 改了页面文字之后

字体只保留了页面上出现过的字，新加的字会退回系统字体。改完任何页面（`index.html`、`404.html`、`demo/platform/index.html`、`demo/industry-map/index.html`）的文字后运行（脚本扫仓库里除谷歌验证文件以外的所有 html，连同图片 `alt` 等会显示出来的属性）：

```
python -X utf8 tools/subset_fonts.py
```

脚本读取 `tools/_src/` 下的字体源文件（不入库）。源文件缺了就从 Google Fonts 官方仓库 https://github.com/google/fonts/tree/main/ofl/ 重新下载，改名后放进 `tools/_src/`：

- `notoserifsc/NotoSerifSC[wght].ttf` → `NotoSerifSC-VF.ttf`
- `notosanssc/NotoSansSC[wght].ttf` → `NotoSansSC-VF.ttf`
- `jost/Jost[wght].ttf` → `Jost-VF.ttf`

需要 `pip install fonttools brotli`。

## 改内容的口径

- 公开网站，台账数字、项目金额、身份证号、合同内容一律不放。
- 插图是示意画，不是真实项目图纸或数据。
- 作品页截图右下角统一带水印「周丹娜原创 · 示例数据 · www.dannazhou.com」，页脚写「© 2026 周丹娜 · 原创作品」，页面底部有一行原创声明。
- 字体全部自托管在 `fonts/`，不连 Google Fonts，国内也能正常显示。

## 搜索收录

- 谷歌：在 Google Search Console 添加 `https://www.dannazhou.com/`（验证文件已在仓库里），提交 `sitemap.xml`。
- 百度：GitHub 屏蔽百度爬虫，放在 GitHub 上百度基本收录不到。要百度收录，需要把网站文件复制到国内服务器并完成 ICP 备案，域名不用换。
