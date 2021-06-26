import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config } : ConfigContext) : ExpoConfig => ({
    ...config,
    name: "saucenao-rn",
    slug: "saucenao-rn",
    extra: {
        sauceNaoBaseUrl: "https://saucenaoproxy-hwsfqylzcq-uw.a.run.app"
    }
});