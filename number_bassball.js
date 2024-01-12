const $input = document.querySelector("#input")
const $form = document.querySelector("#form")
const $logs = document.querySelector("#logs")

const numbers = [];
for (let n = 0; n < 9; n +=1){
    numbers.push(n+1); 
}//숙제 while문으로도 바꿔보기
const answer = [] // 랜덤한 4가지의 수 배열

//랜덤한 수를 뽑고 answer에 넣기
for (let n = 0; n<4; n+=1){
    const index = Math.floor(Math.random()*(numbers.length))
    answer.push(numbers[index])
    numbers.splice(index, 1) // 이렇게 지우는 이유는 중복된 수를 뽑지 않기 하기 위해서 
}
//입력받은 값 점검
const tries = []
function checkInput(input) {
    if(input.length !== 4){//4자리인지 아닌지 판별
        return alert("4자리 숫자를 입력해주세요")
        //여기서 리턴되면 undefinde인데 if문에서는 false이니까 else가 실행됨
    }
    if (new Set(input).size !== 4) { //중복된 숫자가 있는가
        return alert("중복되지 않게 입력해주세요")
    }
    if (tries.includes(input)) { //이미 시도한 값은 아닌가
        return alert("이미 시도한 값입니다.")
    }

    return true
}
console.log(answer)
let out = 0
$form.addEventListener("submit", (event) =>{
    event.preventDefault()//form의 기본동작인 새로고침을 막음
    const value = $input.value;
    $input.value = ''
    if(!checkInput(value)){//문제있음
        return
    }

    if (answer.join('') === value ){//입력값 문제 없음
        $logs.textContent = '홈런!'
        return
    }
    if (tries.length >= 9){//10번 시도 검사
        const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`)
        $logs.appendChild(message)
        //$logs.append(`패배! 정답은 ${answer.join('')}`) 이것도 되지 않을까??
        return
    }
    //몇 스트라이크 몇 볼인지 검사
    let strike = 0
    let ball = 0
    for (let i = 0; i<answer.length; i++){
        const index = value.indexOf(answer[i])
        if (index >-1){
            if (index === i){
                strike +=1
            }
            else {
                ball+=1
            }
        }
        
    }
    //forEach문 사용
    /*
    answer.forEach((element, i) => {
        const index = value.indexOf(element)
        if (index >-1){
            if (index === i){
                strike +=1
            }
            else {
                ball+=1
            }
        }
    })
    */

    if(out >1){
        $logs.append(`패배! 정답은 ${answer.join('')}`)
        return
    }
    if(strike === 0 && ball === 0){
        $logs.append(`${out+1}out`, document.createElement('br'))
        out +=1
        return
    }
    $logs.append(`${value}: ${strike} 스트라이크 ${ball} 볼`, document.createElement("br"))
    tries.push(value)


})