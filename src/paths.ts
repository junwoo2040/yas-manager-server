import "module-alias/register";
import { addAliases } from "module-alias";

addAliases({
    "@routes": `${__dirname}/routes`,
    "@models": `${__dirname}/models`,
    "@utils": `${__dirname}/utils`,
});
