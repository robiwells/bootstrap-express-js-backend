import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
  'libs': `${__dirname}/libs`,
});
