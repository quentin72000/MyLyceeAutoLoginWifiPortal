// Made by quentin72000 (https://github.com/quentin72000)
const puppeteer = require('puppeteer');
const config = require("./config");
const dialog = require("dialog");


// Prepare identifier
if(config.randomIdentifier == true){
  
  config.identifier = {
    username: randomString(12),
    firstname: randomString(7),
    lastname: randomString(8),
    email: randomString(12) + "@gmail.com"
  }
}
console.log(config.identifier);



(async()=> {
    const browser = await puppeteer.launch({
        headless: config.withoutScreen,
        // args: puppeteerArgs
    });
    const page = await browser.newPage();
    await page.goto(config.connectURL, {waitUntil: "networkidle2"}); // Va sur la page de connection
    await page.waitForSelector('#ui_login_self_reg_button')
    await page.$eval( '#ui_login_self_reg_button', buttton => buttton.click()); // Clique sur bouton "Invité"
    await page.waitForNavigation({waitUntil: 'networkidle2'})


    // Typing part
    await page.type('input[id="guestUser.fieldValues.ui_user_name"]', config.identifier.username)
    await page.type('input[id="guestUser.fieldValues.ui_first_name"]', config.identifier.firstname)
    await page.type('input[id="guestUser.fieldValues.ui_last_name"]', config.identifier.lastname)
    await page.type('input[id="guestUser.fieldValues.ui_email_address"]', config.identifier.email)
    
      await clickOnElement(page, 'input[id="ui_self_reg_submit_button"]', form => form.click());
    await page.waitForNavigation({waitUntil: 'networkidle2'})
    
    
    
    
    if(await checkIfElementExists(page, 'input[id="ui_self_reg_results_submit_button"]')){
      await clickOnElement(page, 'input[id="ui_self_reg_results_submit_button"]', button => button.click());
      await page.waitForNavigation({waitUntil: 'networkidle2'})
    }
    else{
      await dialog.err("Utilisateur déjà existant OU une erreur est survenue.\nRéessayer ou tenter de vous connecter manuellement pour vérifier si le réseau fonctionne !", 'Erreur', () => { // S
        process.exit(1)
      })
    }
    

    if(await checkIfElementExists(page, 'button[id="ui_aup_accept_button"]')){
      await clickOnElement(page, 'button[id="ui_aup_accept_button"]');
      await page.waitForNavigation({waitUntil: 'networkidle2'})
    }


    if(await checkIfElementExists(page, 'input[id="ui_post_access_continue_button"]')){
      await clickOnElement(page, 'input[id="ui_post_access_continue_button"]');
      await page.waitForNavigation({waitUntil: 'networkidle2'})
      if(await checkIfElementExists(page, 'h1[id="ui_success_content_label"]')){
        dialog.info("Connexion effectuée avec succès !\nWindows peut prendre un peu de temps pour voir que vous êtes connectée (icone WiFi).", "Succés !", () => {
          process.exit(0)
        })
        
      }
    }
    else{
      dialog.err("Une erreur est survenue.\nRéessayer ou tenter de vous connecter manuellement pour vérifier si le réseau fonctionne !", "Erreur", () => {
        process.exit(1)
      })
    }
  

})()

async function checkIfElementExists(page, query){
  if (await page.$(query) !== null) return true;
  else return false;
}



async function clickOnElement(page, query){
  await page.$eval(query, button => button.click());
}





function randomString(length){
  let characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = ""
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}