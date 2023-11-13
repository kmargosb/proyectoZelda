import { items } from './items.js'
const body = document.querySelector('body')
const stuff = document.querySelectorAll('.class-item');
const itemCont = document.querySelectorAll('.item-cont');
const statsCont = document.querySelectorAll('.statcont');
const menu = document.querySelector('.menu');
const description = document.querySelector('.description');
const rightBottom = document.querySelector('.right-bottom');
const statsInitial = document.querySelector('.statInitial > p');
const statsFinal = document.querySelector('.statFinal > p');
const type = document.querySelector('.type');
const nombreStuff = document.querySelector('.right-bottom > h2');
const equip = document.querySelector('.equip');
const trow = document.querySelector('.trow');
const cancel = document.querySelector('.cancel');
const arma = document.querySelector('.arma');
const pecho = document.querySelector('.pecho');
const escudo = document.querySelector('.escudo');
const cabeza = document.querySelector('.cabeza');
const botas = document.querySelector('.botas')

const {weapons, shields, armors} = items


let weaponName = weapons.map(weapon => weapon.name)
let shieldName = shields.map(shield => shield.name)
let armorName = armors.map(armadura => armadura.name)

let weaponIcon = weapons.map(weapon => weapon.icon)
let shieldIcon = shields.map(shield => shield.icon)
let armourIcon = armors.map(armadura => armadura.icon)

let weaponStats = weapons.map(weapon => weapon.stats.damage)
let shieldStats = shields.map(shield => shield.stats.defense)
let armourStats = armors.map(armadura => armadura.stats.armor)

let weaponDescription = weapons.map(weapon => weapon.description)
let shieldDescription = shields.map(shield => shield.description)
let armorDescription = armors.map(armadura => armadura.description)

//Botones Stuff (muestra las armas escudos y armaduras)
stuff.forEach((item, i) => {
  item.addEventListener('click', () => {
    if (item.classList[1] == "weapon") {
      statsCont.forEach((stat, i) => {
        if (i < weaponStats.length) {
          stat.style.opacity = "1"
          stat.innerText = `${weaponStats[i]}`
        } else {
          stat.style.opacity = "0"
        }
      })
      itemCont.forEach((cont, i) => {
        cont.style.backgroundImage = "none"
        cont.style.backgroundColor = "#1E293B"
        if (i < weaponIcon.length) {
          cont.style.backgroundColor = "transparent"
          cont.style.backgroundImage = `url("${weaponIcon[i]}")`
          cont.id = weaponName[i];
        }
      })
    }
    else if (item.classList[1] == "shield") {
      statsCont.forEach((stat, i) => {
        if (i < shieldStats.length) {
          stat.style.opacity = "1";
          stat.innerText = `${shieldStats[i]}`;
        } else {
          stat.style.opacity = "0";
        }
      })
      itemCont.forEach((cont, i) => {
        cont.style.backgroundImage = "none";
        cont.style.backgroundColor = "#1E293B";
        if (i < shieldIcon.length) {
          cont.style.backgroundColor = "transparent";
          cont.style.backgroundImage = `url("${shieldIcon[i]}")`;
          cont.id = shieldName[i];
        }
      })
    }
    else if (item.classList[1] == "armor") {
      statsCont.forEach((stat, i) => {
        if (i < armourStats.length) {
          stat.style.opacity = "1"
          stat.innerText = `${armourStats[i]}`
        } else {
          stat.style.opacity = "0"
        }
      })
      itemCont.forEach((cont, i) => {
        if (i < armourIcon.length) {
          cont.style.background = "none"
          cont.style.backgroundColor = "transparent"
          cont.style.backgroundImage = `url("${armourIcon[i]}")`
          cont.id = armorName[i]
        }
      })
    }
  })
})

//Selecciona cada elemento muestra su descripcion y sus stats + Menu de agregar o remover
itemCont.forEach((cont, i) => {
  cont.addEventListener('click', (e) => {

    const espada = (cont.style.backgroundImage).includes("weapon");
    const escudex = (cont.style.backgroundImage).includes("shield");
    const ropa = (cont.style.backgroundImage).includes("armors");

    equip.addEventListener('click', (even) => {
      if (espada) {
        menu.classList.remove('activo')
        arma.style.backgroundImage = 'none'
        arma.style.backgroundImage = `url("${weaponIcon[i]}")`
      }
      else if (escudex) {
        menu.classList.remove('activo')
        escudo.style.backgroundImage = 'none'
        escudo.style.backgroundImage = `url("${shieldIcon[i]}")`
      }
      else if (ropa) {
        menu.classList.remove('activo')
        armors.forEach(pieza => {
          if (pieza.name == e.target.id) {
            switch (pieza.category) {
              case 'helm':
                cabeza.style.backgroundImage = 'none'
                cabeza.style.backgroundImage = `url("${pieza.icon}")`
                break;
              case 'greave':
                botas.style.backgroundImage = 'none'
                botas.style.backgroundImage = `url("${pieza.icon}")`
                break;
              case 'armor':
                pecho.style.backgroundImage = 'none'
                pecho.style.backgroundImage = `url("${pieza.icon}")`
            }
          }
        })
      }
    })

    if (espada || escudex || ropa) {
      menu.classList.toggle('activo')
      menu.style.opacity = "1"
      menu.style.left = `${e.clientX}px`
      menu.style.top = `${e.clientY}px`
    } else {
      menu.classList.remove('activo')
    }

    if (espada) {
      rightBottom.style.opacity = "1"
      nombreStuff.innerText = `${weaponName[i]}`
      description.innerText = `${weaponDescription[i]}`
      statsFinal.innerText = `${weaponStats[i]}`
      type.classList.remove("weap", "shie", "arm")
      type.classList.add('weap')

      !(Number(statsInitial.innerText) < Number(statsFinal.innerText))
        ? (statsInitial.style.border = "1px solid green") && (statsFinal.style.border = "1px solid red")
        : !(statsInitial.innerText > statsFinal.innerText)
          ? (statsInitial.style.border = "1px solid red") && (statsFinal.style.border = "1px solid green")
          : (statsInitial.style.border = "1px solid green") && (statsFinal.style.border = "1px solid green")
    }
    else if (escudex) {

      type.classList.remove("weap", "shie", "arm")
      rightBottom.style.opacity = "1"
      nombreStuff.innerText = `${shieldName[i]}`
      description.innerText = `${shieldDescription[i]}`
      statsFinal.innerText = `${shieldStats[i]}`
      type.classList.add('shie')

      !(Number(statsInitial.innerText) < Number(statsFinal.innerText))
        ? (statsInitial.style.border = "1px solid green") && (statsFinal.style.border = "1px solid red")
        : !(statsInitial.innerText > statsFinal.innerText)
          ? (statsInitial.style.border = "1px solid red") && (statsFinal.style.border = "1px solid green")
          : (statsInitial.style.border = "1px solid green") && (statsFinal.style.border = "1px solid green")

    } else if (ropa) {

      type.classList.remove("weap", "shie", "arm")
      rightBottom.style.opacity = "1"
      nombreStuff.innerText = `${armorName[i]}`
      description.innerText = `${armorDescription[i]}`
      statsFinal.innerText = `${armourStats[i]}`
      type.classList.add('arm')

      !(Number(statsInitial.innerText) < Number(statsFinal.innerText))
        ? (statsInitial.style.border = "1px solid green") && (statsFinal.style.border = "1px solid red")
        : !(statsInitial.innerText > statsFinal.innerText)
          ? (statsInitial.style.border = "1px solid red") && (statsFinal.style.border = "1px solid green")
          : (statsInitial.style.border = "1px solid green") && (statsFinal.style.border = "1px solid green")
    }
    else { rightBottom.style.opacity = "0" }

  })
})


trow.addEventListener('click', (e) => {
})
cancel.addEventListener('click', () => {
  menu.classList.remove('activo')
})


// cont.classList.remove('itemCont-focus')
// e.target.classList.add('itemCont-focus')
