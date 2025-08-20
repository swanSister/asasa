module.exports = {
  lintOnSave: false,
  productionSourceMap: false, // 소스맵 끄기 → 메모리 절약
  parallel: false,            // 병렬 빌드 끄기 → t2/t3.micro에서 필수
  devServer: { host: '0.0.0.0', port: 3005, disableHostCheck: true },
  // 여전히 멈추면 아래 주석 해제해서 최소화 잠시 끄고 원인 확인
  // configureWebpack: { optimization: { minimize: false } },
};