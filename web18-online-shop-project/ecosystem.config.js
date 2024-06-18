module.exports = {
	apps: [
	  {
		name: 'online-shop',
		script: './app.js',
		instances: 0, // CPU 코어 수에 맞게 자동 설정
		autorestart: true,
		watch: false, // 프로덕션 환경에서는 false 권장
		max_memory_restart: '1G', // 메모리 사용 패턴에 따라 설정
		env: {
		  NODE_ENV: 'development'
		},
		env_production: {
		  NODE_ENV: 'production'
		}
	  }
	]
  };

  // pm2 start ecosystem.config.js --env production