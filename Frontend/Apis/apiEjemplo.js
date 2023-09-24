const opc={
    "GET": ()=>getDataRecluta(),
    "POST": (data)=>postDataRecluta(data),
    "PUT": (data,id)=>putDataRecluta(data,id),
    "DELETE": (id)=>deleteDataRecluta(id),
}

let config={
    headers:new Headers({
        "Content-Type": "application/json"
    })
};

const getDataRecluta = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:3000/reclutas",config)).json();
    return res;
}

const postDataRecluta = async(data)=>{
    config.method = "POST";
    config.body=JSON.stringify(data);
    let res= await ( await fetch("http://localhost:3000/reclutas",config)).json();
    console.log(res);
}

const putDataRecluta = async(data,id)=>{
    config.method = "PUT";
    config.body=JSON.stringify(data);
    let res= await ( await fetch(`http://localhost:3000/reclutas/${id}`,config)).json();
    console.log(res);
}

const deleteDataRecluta = async(id)=>{
    config.method = "DELETE";
    let res= await ( await fetch(`http://localhost:3000/reclutas/${id}`,config)).json();
    console.log(res);
}

const getReclutaById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:3000/reclutas/${id}`,config)).json();
    return res;
}

export {
    opc, getDataRecluta, postDataRecluta, putDataRecluta, deleteDataRecluta, getReclutaById
}