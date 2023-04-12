import { TranslationServiceClient } from '@google-cloud/translate';
import { Request, Response } from "express";
import { postgreQuery } from '../db/postgres-connection';


/* =================
   ROUTE HANDLER
================== */
export async function translateTask(req: Request, res : Response) {
	let name = req.body.name;
	let text = req.body.text;
	let id = req.body.id;
	if (id == undefined || text == undefined || name == undefined) {
		return res.status(400).send();
	}
    
	try {
        let transName = await translate(name);
        let transText = await translate(text);
      
        let response = {
            'name' : transName,
            'text' : transText
        }

      await postgreQuery('UPDATE tasks SET translated = true, translated_date = CURRENT_TIMESTAMP WHERE id = $1',[id])
	  return res.status(200).json(response)
	} catch (error) {
	  console.error("An error occurred while retrieving data: ", error);
	  return res.status(500).send();
	}
};




async function translate(text: string) {
    const translationClient = new TranslationServiceClient();
    // Construct request
    const request = {
        parent: `projects/verdant-nova-383511/locations/australia-southeast-1`,
        contents: [text],
        mimeType: 'text/plain', // mime types: text/plain, text/html
        sourceLanguageCode: 'en',
        targetLanguageCode: 'uk',
    };

    // Run request
    const [response] = await translationClient.translateText(request);
    if(response.translations != undefined){
        for (const translation of response.translations) {
            console.log(`Translation: ${translation.translatedText}`);
        }
    }
}