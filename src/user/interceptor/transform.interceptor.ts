import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";




export class TransformInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler){

        console.log("befor...");


        return next.handle().pipe(
            map((data)=>{
                console.log('after...'),
                console.log(data);
                const respons = {
                    id : data.id,
                    name: data.name
                }
                return respons;
            })
        )

    }
}