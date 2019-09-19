module.exports.checkStatus = (Status) => {
    let state = '';
    if (Status === "OnProcessing")
    {
        state = 'Chưa Giao'
    }else{
        if(Status === "OnDelivering"){
            state = 'Đang Giao'
        }else{
            if(Status === 'Received'){
                state = 'Giao Thành Công'
            }else{
                state = 'Giao Thất Bại'
            }
        }
    }
    return state;
}

module.exports.checkStyle = (Status) => {
    let state = '';
    if (Status === "OnProcessing")
    {
        state = {color: 'blue'}
    }else{
        if(Status === "OnDelivering"){
            state = {color: '#ff6600'}
        }else{
            if(Status === 'Received'){
                state = {color: 'green'}
            }else{
                state = {color: 'red'}
            }
        }
    }
    return state;
}

module.exports.checkStyleDeliveryMethod = (Status) => {
    let state = '';
    if (Status === "Standard") {
        state = {color: 'green'}
    } else {
        if (Status === "Fast") {
            state = {color: 'blue'}
        }
    }
    return state;
}

module.exports.checkDeliveryMethod = (Status) => {
    let state = '';
    if (Status === "Standard") {
        state = 'Giao Thường'
    } else {
        if (Status === "Fast") {
            state = 'Giao Nhanh'
        }
    }
    return state;
}

module.exports.checkTypeShipper = (Status) => {
    let state = '';
    if (Status === "StandardShipper") {
        state = 'Nhân Viên Giao Thường'
    } else {
        if (Status === "FastShipper") {
            state = 'Nhân Viên Giao Nhanh'
        }
    }
    return state;
}