module.exports = {
	extends: ['plugin:vue/base', 'eslint:recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	rules: {
		// override/add rules settings here, such as:
		// 'vue/no-unused-vars': 'error'
	},
};
