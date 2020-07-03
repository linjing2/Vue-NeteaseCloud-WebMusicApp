// export function debounce(fun,wait){
//     let timer=null;
//     return function(...args){
//         if(timer)clearTimeout(timer);
//         timer=setTimeout(()=>{
//             fun&&fun.apply(this,args);
//             console.log('--');
//         },wait)
//     }
// }

export function debounce(fn,delay){
    let timer=null;
    
    //返回的函数是用户每次实际调用的函数
    return (...args)=>{
      if(timer)clearTimeout(timer);
      timer=setTimeout(()=>{
        fn&&fn.apply(this,args)
      },delay)
    }
  }