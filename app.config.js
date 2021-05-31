import 'dotenv/config';

export default ({ config }) => {
    return {
        ...config,
        extra: {
            api_key: process.env.API_KEY
        }
    }
};