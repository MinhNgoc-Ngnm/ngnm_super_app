import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
import {getSharedDependencies} from 'rn_super_app_sdk';
import {ReanimatedPlugin} from '@callstack/repack-plugin-reanimated';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default env => {
  const {mode} = env;

  return {
    mode,
    context: __dirname,
    entry: {},
    experiments: {
      incremental: mode === 'development',
    },
    resolve: {
      ...Repack.getResolveOptions(),
    },
    output: {
      uniqueName: 'ngnm-auth',
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules({inline: true}),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new ReanimatedPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'auth',
        filename: 'auth.container.js.bundle',
        dts: false,
        exposes: {
          './AccountScreen': './src/screens/AccountScreen',
          './SignInScreen': './src/screens/SignInScreen',
          './AuthProvider': './src/providers/AuthProvider',
        },
        shared: getSharedDependencies({eager: false}),
      }),
      new Repack.plugins.CodeSigningPlugin({
        enabled: mode === 'production',
        privateKeyPath: path.join('..', '..', 'code-signing.pem'),
      }),
    ],
  };
};
