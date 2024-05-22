//Execute async tasks in Parallel

function createAsyncTask(){
    const value = Math.floor(Math.random() * 10)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(value < 5){
                reject(`Error: ${value}`)
            } else {
                resolve(`value: ${value}`)
            }
        }, value * 1000)
    })
}

const tasks = [
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask()
]

const asyncInParallel = (tasks, callback) => {
    const results = [];
    const errors = [];

    let completed = 0;

    tasks.forEach((task) => {
        task
        .then((val) => {
            results.push(val)
        })
        .catch((err) => {
            errors.push(err)
        })
        .finally(() => {
            completed += 1;
            if(completed >= tasks.length){
                callback(results, errors)
            }
        })
    })
}


asyncInParallel(tasks, (error, result) => {
    console.log("result", result)
    console.error("error", error)
})