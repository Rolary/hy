import React,{ useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({
    hero: React.createRef(),
    overview: React.createRef(),
    architecture: React.createRef(),
    capabilities: React.createRef(),
    products: React.createRef(),
    conclusion: React.createRef(),
  });

  // 监听滚动，更新当前激活的部分
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section in sectionRefs.current) {
        const ref = sectionRefs.current[section];
        if (ref.current) {
          const element = ref.current;
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 滚动到指定部分
  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs.current[sectionId];
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 20,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  // 切换产品详情展开状态
  const toggleProductExpand = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  const navItems = [
    { id: 'hero', label: '首页' },
    { id: 'overview', label: '整体方案' },
    { id: 'architecture', label: '平台架构' },
    { id: 'capabilities', label: '核心能力' },
    { id: 'products', label: '产品系列' },
    { id: 'conclusion', label: '总结展望' },
  ];

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] overflow-hidden">
      {/* 背景装饰 */}
      <div className="fixed inset-0 bg-overlay-grid z-0 opacity-20"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-[var(--color-accent-primary)]/5 to-[var(--color-accent-secondary)]/5 z-0"></div>
      
      {/* 悬浮导航按钮 - 竖屏优化 */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed bottom-8 right-8 z-50 bg-[var(--color-accent-primary)] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-[var(--color-accent-primary)]/20"
      >
        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
      </motion.button>
      
      {/* 移动端导航菜单 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-28 right-8 z-40 bg-[var(--color-surface)]/95 backdrop-blur-lg border border-[var(--color-border)] rounded-xl shadow-2xl p-4 w-64"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-3 px-4 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                    activeSection === item.id 
                      ? 'bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)]' 
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeSection === item.id ? 'bg-[var(--color-accent-primary)]' : 'bg-transparent'}`}></span>
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 主内容区域 */}
      <main className="w-full relative z-10">
        {/* 首页英雄区 */}
        <section 
          id="hero" 
          ref={sectionRefs.current.hero}
          className="min-h-screen flex flex-col justify-center items-center p-8 relative overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent-primary)]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-accent-secondary)]/10 rounded-full blur-3xl"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-3xl mx-auto text-center z-10"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1.5 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] rounded-full mx-auto mb-8"
            ></motion.div>
            
            <h1 className="heading-cover text-5xl sm:text-6xl md:text-7xl mb-8">
              浩远智能<br />
              <span className="text-[var(--color-accent-primary)]">AI+机器人</span><br />
              产品解决方案
            </h1>
            
            <p className="text-xl text-[var(--color-text-secondary)] mb-12 max-w-xl mx-auto">
              引领智能未来，重塑人机交互
            </p>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              onClick={() => scrollToSection('overview')}
              className="px-8 py-4 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-white rounded-full font-medium flex items-center gap-2 mx-auto hover:shadow-lg hover:shadow-[var(--color-accent-primary)]/20 transition-all duration-300"
            >
              探索方案 <i className="fas fa-arrow-down"></i>
            </motion.button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center"
          >
            <p className="text-[var(--color-text-secondary)] text-sm">发布时间: 2025-11-06</p>
          </motion.div>
        </section>

        {/* 整体方案概述 */}
        <section 
          id="overview" 
          ref={sectionRefs.current.overview}
          className="min-h-screen flex flex-col justify-center py-16 px-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-12 text-center">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '80px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-1 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] rounded-full mx-auto mb-6"
              ></motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">AI智慧运维整体方案</h2>
            </div>
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[var(--color-surface)]/70 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl p-8 mb-12"
            >
              <p className="text-xl md:text-2xl font-light leading-relaxed text-[var(--color-text-primary)]">
                以人工智能机器人为核心+软件系统管理平台，面向金融、电信运营商等大型园区提供智能化服务解决方案，包含巡检、智能交互、资产管理等场景
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[var(--color-surface)]/50 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-accent-primary)]">核心优势</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-primary)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-bolt text-[var(--color-accent-primary)]"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">高效智能</h4>
                    <p className="text-[var(--color-text-secondary)] text-sm">AI驱动的自动化流程，大幅提升运维效率</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-secondary)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-shield-alt text-[var(--color-accent-secondary)]"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">安全可靠</h4>
                    <p className="text-[var(--color-text-secondary)] text-sm">7×24小时不间断监控，实时响应异常情况</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-tertiary)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-brain text-[var(--color-accent-tertiary)]"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">智能决策</h4>
                    <p className="text-[var(--color-text-secondary)] text-sm">基于大数据分析的预测性维护与智能决策</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-success)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-users text-[var(--color-success)]"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">人机协同</h4>
                    <p className="text-[var(--color-text-secondary)] text-sm">优化人机协作模式，释放人力资源价值</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 平台架构 */}
        <section 
          id="architecture" 
          ref={sectionRefs.current.architecture}
          className="min-h-screen flex flex-col justify-center py-16 px-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-12 text-center">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '80px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-1 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] rounded-full mx-auto mb-6"
              ></motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">AI智慧运维平台架构</h2>
              <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
                多层次架构设计，确保系统稳定性与扩展性
              </p>
            </div>
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[var(--color-surface)]/70 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl p-6 shadow-lg"
            >
              <div className="w-full flex justify-center">
                <img 
                  src="https://youke1.picui.cn/s1/2025/11/12/691411648dcab.png"
                  alt="AI智慧运维平台架构图" 
                  className="max-w-full h-auto rounded-lg shadow-[var(--shadow-glow-primary)]"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 核心能力 */}
        <section 
          id="capabilities" 
          ref={sectionRefs.current.capabilities}
          className="min-h-screen flex flex-col justify-center py-16 px-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-12 text-center">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '80px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-1 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] rounded-full mx-auto mb-6"
              ></motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">AI智慧运维核心能力</h2>
              <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
                四大核心能力，全面提升运维效率与智能化水平
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 智能知识管理 */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[var(--color-surface)]/70 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-accent-primary)] transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent-primary)]/20 to-[var(--color-accent-primary)]/5 flex items-center justify-center mb-6 group-hover:from-[var(--color-accent-primary)]/30 transition-all duration-300">
                  <i className="fas fa-brain text-2xl text-[var(--color-accent-primary)]"></i>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-[var(--color-accent-primary)] transition-colors duration-300">智能知识管理与经验沉淀</h3>
                <p className="text-[var(--color-text-secondary)]">
                  自动化构建运维知识图谱、FAQ问答库，从文档、案例、日志中抽取知识并持续更新，形成企业核心知识库
                </p>
              </motion.div>
              
              {/* 人机协同 */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[var(--color-surface)]/70 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-accent-primary)] transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent-primary)]/20 to-[var(--color-accent-primary)]/5 flex items-center justify-center mb-6 group-hover:from-[var(--color-accent-primary)]/30 transition-all duration-300">
                  <i className="fas fa-robot text-2xl text-[var(--color-accent-primary)]"></i>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-[var(--color-accent-primary)] transition-colors duration-300">人机协同与智能助理</h3>
                <p className="text-[var(--color-text-secondary)]">
                  多Agent与智能机器人协同，实现全流程自动化运维，辅助运维人员决策与任务执行建议，提升工作效率
                </p>
              </motion.div>
              
              {/* 智能监控 */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[var(--color-surface)]/70 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-accent-primary)] transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent-primary)]/20 to-[var(--color-accent-primary)]/5 flex items-center justify-center mb-6 group-hover:from-[var(--color-accent-primary)]/30 transition-all duration-300">
                  <i className="fas fa-chart-line text-2xl text-[var(--color-accent-primary)]"></i>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-[var(--color-accent-primary)] transition-colors duration-300">智能监控与异常检测</h3>
                <p className="text-[var(--color-text-secondary)]">
                  融合多源监控数据，基于机器学习实现异常模式识别与阈值自适应，实时告警+趋势分析，防患于未然
                </p>
              </motion.div>
              
              {/* 预测分析 */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-[var(--color-surface)]/70 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-accent-primary)] transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent-primary)]/20 to-[var(--color-accent-primary)]/5 flex items-center justify-center mb-6 group-hover:from-[var(--color-accent-primary)]/30 transition-all duration-300">
                  <i className="fas fa-shield-halved text-2xl text-[var(--color-accent-primary)]"></i>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-[var(--color-accent-primary)] transition-colors duration-300">预测分析与安全防护</h3>
                <p className="text-[var(--color-text-secondary)]">
                  预判设备故障与部件寿命，自动工单、自愈脚本执行，实时威胁检测与阻断，保障系统安全稳定运行
                </p>
              </motion.div>
            </div>
            

          </motion.div>
        </section>

        {/* 产品系列 */}<section 
          id="products" 
          ref={sectionRefs.current.products}
          className="min-h-screen flex flex-col justify-center py-16 px-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-12 text-center">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '80px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-1 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] rounded-full mx-auto mb-6"
              ></motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">AI+机器人产品系列</h2>
              <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
                三大产品系列，满足不同场景需求
              </p>
            </div>
            
            {/* 智动系列 */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[var(--color-surface)]/70 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl overflow-hidden mb-8"
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleProductExpand('intellidrive')}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-primary)]/20 flex items-center justify-center">
                      <i className="fas fa-brain text-xl text-[var(--color-accent-primary)]"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-accent-primary)]">AI+智动系列</h3>
                  </div>
                  <motion.i 
                    className={`fas fa-chevron-down text-[var(--color-text-secondary)] transition-transform duration-300 ${expandedProduct === 'intellidrive' ? 'rotate-180' : ''}`}
                    animate={{ rotate: expandedProduct === 'intellidrive' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.i>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedProduct === 'intellidrive' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-[var(--color-border)]"
                  >
                    <div className="p-6 pt-4">
                      <div className="mb-6">
                        <h4 className="font-bold mb-3">基础大模型+领域小模型协同架构</h4>
                        <p className="text-[var(--color-text-secondary)] mb-4">贯穿"预警-决策-执行-反馈"全链路，融合运维专业知识与历史数据，构建决策大脑</p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-6 mb-6">
                        <div className="p-5 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]/50">
                          <h5 className="font-medium text-[var(--color-accent-primary)] mb-3 flex items-center gap-2">
                            <i className="fas fa-brain"></i> 融合运维专业知识与历史数据，构建决策大脑
                          </h5>
                          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                            以DeepSeek、Qwen-72B、ChatGLM2-6B等基础大模型为核心，融合运维专业知识与历史数据，构建决策大脑，大模型深度注入决策环节与知识调度。当机房温度、电压等监测数据触发预警时，其能快速调用历史案例库中10万+条故障记录，对照运维导则规范进行逻辑推理，10秒内即可完成"异常等级判定-巡检优先级排序"的初步决策。
                          </p>
                          <div className="relative w-full max-h-50 overflow-hidden rounded-lg">
                            <img 
                              src="https://youke1.picui.cn/s1/2025/11/12/6914117fa46b3.jpg"
                              alt="模型分析模块与数据流" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        <div className="p-5 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]/50">
                          <h5 className="font-medium text-[var(--color-accent-primary)] mb-3 flex items-center gap-2">
                            <i className="fas fa-microchip"></i> 参数解析与根因定位设备异常
                          </h5>
                          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                            通过迁移学习优化的小模型实现毫秒级数据筛选，每秒从上千条监测数据中精准提取异常参数，为大模型决策提供精准输入。针对特定设备类型优化，如电池故障溯源模型、空调故障模型等。
                          </p>
                          <div className="relative w-full max-h-50 overflow-hidden rounded-lg">
                            <img 
                              src="https://youke1.picui.cn/s1/2025/11/12/6914117f67b17.jpg"
                              alt="电池故障溯源模型与空调故障监控" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        <div className="p-5 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]/50">
                          <h5 className="font-medium text-[var(--color-accent-primary)] mb-3 flex items-center gap-2">
                            <i className="fas fa-tasks"></i> 抽象巡检策略转化为具体任务
                          </h5>
                          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                            大语言模型接收抽象策略后，自动拆解为结构化指令，附带精度要求、时间限制等参数，直接下达至机器人控制系统。可根据突发情况即时更新任务指令，避免任务与工况脱节。
                          </p>
                          <div className="relative w-full max-h-50 overflow-hidden rounded-lg">
                            <img 
                              src="https://youke1.picui.cn/s1/2025/11/12/6914117a35a0f.jpg"
                              alt="大语言模型任务拆解场景" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        <div className="p-5 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]/50">
                          <h5 className="font-medium text-[var(--color-accent-primary)] mb-3 flex items-center gap-2">
                            <i className="fas fa-eye"></i> 多维感知机房环境异常
                          </h5>
                          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                            多模态感知小模型矩阵，包括声纹识别、红外热成像分析、环境适配小模型和缺陷识别小模型，全方位捕捉设备运行状态，替代人工"耳听判断"环节，使局部过热检测效率提升10倍。
                          </p>
                          <div className="relative w-full max-h-50 overflow-hidden rounded-lg">
                            <img 
                              src="https://youke1.picui.cn/s1/2025/11/12/69141179e96ec.jpg"
                              alt="声纹识别模型" 
                              className="w-full h-full object-cover"
                            />
                              <center className="tag">声纹识别</center>

                          </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                            </div>
                            <div className="relative w-full max-h-50 overflow-hidden rounded-lg">
                                <img
                                    src="https://youke1.picui.cn/s1/2025/11/12/691411796e5d8.jpg"
                                    alt="红外热成像分析"
                                    className="w-full h-full object-cover"
                                />
                                <center className="tag">红外热成像分析</center>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                            </div>
                            <div className="relative w-full max-h-50 overflow-hidden rounded-lg">
                                <img
                                    src="https://youke1.picui.cn/s1/2025/11/12/6914117915c75.jpg"
                                    alt="环境适配小模型参数对比"
                                    className="w-full h-full object-cover"
                                />
                                <center className="tag">环境适配小模型参数对比</center>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                            </div>
                            <div className="relative w-full max-h-50 overflow-hidden rounded-lg">
                                <img
                                    src="https://youke1.picui.cn/s1/2025/11/12/69141178299c5.jpg"
                                    alt="缺陷识别小模型"
                                    className="w-full h-full object-cover"
                                />
                                <center className="tag">缺陷识别</center>
                            </div>
                        </div>
                      </div>
                      

                      

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* 灵动系列 */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[var(--color-surface)]/70 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl overflow-hidden mb-8"
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleProductExpand('smartdrive')}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-secondary)]/20 flex items-center justify-center">
                      <i className="fas fa-comments text-xl text-[var(--color-accent-secondary)]"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-accent-secondary)]">AI+灵动系列</h3>
                  </div>
                  <motion.i 
                    className={`fas fa-chevron-down text-[var(--color-text-secondary)] transition-transform duration-300 ${expandedProduct === 'smartdrive' ? 'rotate-180' : ''}`}
                    animate={{ rotate: expandedProduct === 'smartdrive' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.i>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedProduct === 'smartdrive' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-[var(--color-border)]"
                  >
                      <div className="p-6 pt-4">
                        <div className="grid grid-cols-1 gap-6">
                          <div className="p-5 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]/50">
                            <h4 className="font-medium text-[var(--color-accent-secondary)] mb-3 flex items-center gap-2">
                              <i className="fas fa-tools"></i> AI+灵动S1机器人
                            </h4>
                            <div className="space-y-4 ml-6">
                              <div>
                                <h5 className="font-medium mb-2 text-[var(--color-text-primary)]">复杂工单智能拆解与动态调整</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">结合历史同类工单数据、实时环境信息，生成定制化作业方案</p>
                              </div>
                              <div>
                                <h5 className="font-medium mb-2 text-[var(--color-text-primary)]">自然语言深度交互与知识问答</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">突破关键词识别局限，支持上下文理解式对话，实时调取设备厂商技术手册</p>
                              </div>
                                <div className="relative w-full max-h-50 overflow-hidden rounded-lg mt-4">
                                    <img
                                        src="https://youke1.picui.cn/s1/2025/11/12/6914116f75654.jpg"
                                        alt="自然语言深度交互与知识问答"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                              <div>
                                <h5 className="font-medium mb-2 text-[var(--color-text-primary)]">全流程数据复盘与经验沉淀</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">对作业数据进行语义化分析，自动识别高频问题，将随工经验转化为结构化知识</p>
                              </div>
                                <div className="relative w-full max-h-50 overflow-hidden rounded-lg mt-4">
                                    <img
                                        src="https://youke1.picui.cn/s1/2025/11/12/69141164aa5e4.jpg"
                                        alt="自然语言深度交互与知识问答"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>



                          </div>
                          
                          <div className="p-5 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]/50">
                            <h4 className="font-medium text-[var(--color-accent-secondary)] mb-3 flex items-center gap-2">
                              <i className="fas fa-user-tie"></i> AI+灵动I1机器人
                            </h4>
                            <div className="space-y-4 ml-6">
                              <div>
                                <h5 className="font-medium mb-2 text-[var(--color-text-primary)]">访客需求深度洞察与预判</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">结合访客属性、来访时间、企业动态，预判潜在需求，生成结构化对比回答</p>
                              </div>
                                <div className="relative w-full max-h-50 overflow-hidden rounded-lg mt-4">
                                    <img
                                        src="https://youke1.picui.cn/s1/2025/11/12/6914116f44c24.jpg"
                                        alt="访客需求深度洞察与预判"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                              <div>
                                <h5 className="font-medium mb-2 text-[var(--color-text-primary)]">多场景话术智能适配与情感交互</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">根据场景氛围、访客情绪调整表达，突破固定话术库局限</p>
                              </div>
                              <div>
                                <h5 className="font-medium mb-2 text-[var(--color-text-primary)]">跨场景服务协同与人员资源调度</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">联动企业多系统实现全链路服务，查询会议室状态、协调人员时间，生成预约确认单</p>
                              </div>
                                <div className="relative w-full max-h-50 overflow-hidden rounded-lg mt-4">
                                    <img
                                        src="https://youke1.picui.cn/s1/2025/11/12/6914116489d2b.jpg"
                                        alt="访客需求深度洞察与预判"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>


                          </div>
                          
                          <div className="p-5 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]/50">
                            <h4 className="font-medium text-[var(--color-accent-secondary)] mb-3 flex items-center gap-2">
                              <i className="fas fa-shield-alt"></i> AI+灵动P1机器人
                            </h4>
                            <div className="space-y-4 ml-6">
                              <div>
                                <h5 className="font-medium mb-2 text-[var(--color-text-primary)]">多维度数据融合与风险提前预警</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">整合历史安防、实时环境、外部数据，生成风险预判报告，提前调整巡检路线</p>
                              </div>
                                <div className="relative w-full max-h-50 overflow-hidden rounded-lg">
                                    <img
                                        src="https://youke1.picui.cn/s1/2025/11/12/6914116eeeb85.jpg"
                                        alt="多维度数据融合与风险提前预警"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                              <div>
                                <h5 className="font-medium mb-2 text-[var(--color-text-primary)]">复杂异常智能决策与多系统联动处置</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">根据异常严重程度、场景类型制定分级处置方案，联动多系统协同处理</p>
                              </div>
                              <div>
                                <h5 className="font-medium mb-2 text-[var(--color-text-primary)]">安防数据语义化分析与规律挖掘</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">对海量安防数据做语义化分析，识别规律并生成优化建议，转化为标准化手册</p>
                              </div>
                                <div className="relative w-full max-h-50 overflow-hidden rounded-lg">
                                    <img
                                        src="https://youke1.picui.cn/s1/2025/11/12/6914116ebc53a.jpg"
                                        alt="复杂异常智能决策与多系统联动处置"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">


                            </div>
                          </div>
                        </div>
                      </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* 魔动系列 */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[var(--color-surface)]/70 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl overflow-hidden"
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleProductExpand('magicdrive')}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-tertiary)]/20 flex items-center justify-center">
                      <i className="fas fa-location-crosshairs text-xl text-[var(--color-accent-tertiary)]"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-accent-tertiary)]">AI+魔动系列</h3>
                  </div>
                  <motion.i 
                    className={`fas fa-chevron-down text-[var(--color-text-secondary)] transition-transform duration-300 ${expandedProduct === 'magicdrive' ? 'rotate-180' : ''}`}
                    animate={{ rotate: expandedProduct === 'magicdrive' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.i>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedProduct === 'magicdrive' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-[var(--color-border)]"
                  >
                      <div className="p-6 pt-4">
                        <div className="grid grid-cols-1 gap-6">
                          <div className="p-5 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]/50">
                            <h4 className="font-medium text-[var(--color-accent-tertiary)] mb-3 flex items-center gap-2">
                              <i className="fas fa-warehouse"></i> AI+魔动D1机器人
                            </h4>
                            <div className="space-y-4 ml-6">
                              <div>
                                <h5 className="font-medium mb-2 text-[var(--color-text-primary)]">智能库存动态规划</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">整合历史出入库数据、实时库存状态、业务需求，生成动态库存规划方案，优化货架布局</p>
                              </div>
                              <div>
                                <h5 className="font-medium mb-2 text-[var(--color-text-primary)]">精准上下架与异常规避</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">结合视觉识别精准定位目标货物，分析设备特性规划最优抓取路径，实时预警并给出调整建议</p>
                              </div>
                              <div>
                                <h5 className="font-medium mb-2 text-[var(--color-text-primary)]">全流程数据追溯与优化</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">对上下架作业数据进行语义化分析，自动生成库存台账与作业报表，识别高频问题并输出优化建议</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                              <div className="relative w-full max-h-50 overflow-hidden rounded-lg">
                                <img 
                                  src="https://youke1.picui.cn/s1/2025/11/12/691411646994a.jpg"
                                  alt="智能库存动态规划" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="relative w-full max-h-50 overflow-hidden rounded-lg">
                                <img 
                                  src="https://youke1.picui.cn/s1/2025/11/12/691411645fb9c.jpg"
                                  alt="精准上下架与异常规避" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-5 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]/50">
                            <h4 className="font-medium text-[var(--color-accent-tertiary)] mb-3 flex items-center gap-2">
                              <i className="fas fa-route"></i> AI+魔动H1机器人
                            </h4>
                            <div className="space-y-4 ml-6">
                              <div>
                                <h5 className="font-medium mb-2 text-[var(--color-text-primary)]">多场景巡检任务智能统筹</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">整合巡检需求，结合实时环境数据，自动规划巡检路线与任务优先级，动态调整避免重复巡检</p>
                              </div>
                              <div>
                                <h5 className="font-medium mb-2 text-[var(--color-text-primary)]">精准多任务执行与异常研判</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">辅助区分无害与有害异物，规划取放路径；结合历史与实时数据研判温度异常原因，推送处置建议</p>
                              </div>
                            </div>
                            <div className="relative w-full max-h-50 overflow-hidden rounded-lg mt-4">
                              <img 
                                src="https://youke1.picui.cn/s1/2025/11/12/6914116e74d38.jpg"
                                alt="多场景巡检任务智能统筹" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </section>

        {/* 总结与展望 */}
        <section 
          id="conclusion" 
          ref={sectionRefs.current.conclusion}
          className="min-h-screen flex flex-col justify-center py-16 px-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-12 text-center">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '80px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-1 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] rounded-full mx-auto mb-6"
              ></motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">总结与展望</h2>
            </div>
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-[var(--color-surface)]/70 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl p-8 mb-12 text-center"
            >
              <p className="text-xl leading-relaxed text-[var(--color-text-primary)] mb-6">
                浩远智能AI+机器人解决方案，以人工智能为核心驱动，融合多模态感知、智能决策与执行，为金融、电信等行业提供全面的智能化服务解决方案。
              </p>
              <div className="decorative-line mx-auto"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[var(--color-surface)]/70 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-accent-primary)] transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent-primary)]/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-[var(--color-accent-primary)]/30 transition-all duration-300">
                  <i className="fas fa-rocket text-2xl text-[var(--color-accent-primary)]"></i>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center group-hover:text-[var(--color-accent-primary)] transition-colors duration-300">技术创新</h3>
                <p className="text-[var(--color-text-secondary)] text-center">
                  持续投入AI大模型与机器人技术研发，推动行业技术革新，保持技术领先优势
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-[var(--color-surface)]/70 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-accent-secondary)] transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent-secondary)]/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-[var(--color-accent-secondary)]/30 transition-all duration-300">
                  <i className="fas fa-handshake text-2xl text-[var(--color-accent-secondary)]"></i>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center group-hover:text-[var(--color-accent-secondary)] transition-colors duration-300">行业赋能</h3>
                <p className="text-[var(--color-text-secondary)] text-center">
                  深化行业应用，为客户创造实际价值，提升运营效率，降低成本，实现互利共赢
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-[var(--color-surface)]/70 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-accent-tertiary)] transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent-tertiary)]/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-[var(--color-accent-tertiary)]/30 transition-all duration-300">
                  <i className="fas fa-globe text-2xl text-[var(--color-accent-tertiary)]"></i>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center group-hover:text-[var(--color-accent-tertiary)] transition-colors duration-300">生态构建</h3>
                <p className="text-[var(--color-text-secondary)] text-center">
                  构建开放合作生态，与合作伙伴共同推动AI+机器人产业发展，共创智能未来
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <p className="text-[var(--color-text-secondary)]">© 2025 浩远智能 AI+机器人产品解决方案</p>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}