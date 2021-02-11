const $aNav = document.querySelectorAll(".navbar>a");
const $aLi = document.querySelectorAll("#nav-li-a>li>a");

console.log($aNav);
console.log($aLi);

const $allNavA = [];
$aNav.forEach(e=> $allNavA.push(e));
$aLi.forEach(e=> $allNavA.push(e));
$allNavA.splice(1,1);
console.log($allNavA);

