import { surpriseMePrompts } from "../constants";
import fileSaver from 'file-saver'
export function getRandomPrompt(prompt){
    const RandomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[RandomIndex];
    if(randomPrompt === prompt )
        return getRandomPrompt(prompt) ;
        
    return randomPrompt ;
}
export async function downloadImage(id,photo){
    fileSaver.saveAs(photo,`download-${id}.jpg`)
}   