import { Logger, NestMiddleware } from "@nestjs/common";

export class AppLoggerMiddleware implements NestMiddleware{
    logger = new Logger('HTTP');
    use(req: any, res: any, next: () => void) {
        const { ip, method, originalUrl:url} = req;
        const hostname = require('os').hostname();
        const userAgent = req.get('user-agent') || '';
        const referer = req.get('referer') || '';

        res.on('close', () =>{
            const { statusCode, statusMessage } = res;
            const contentLength = res.get('content-length');
            this.logger.log(
                `[${hostname}] "${method} ${url}" ${statusCode} ${statusMessage} ${contentLength} "${referer}" "${userAgent}" "${ip}"`,
            )
        });
        next();
    }
}