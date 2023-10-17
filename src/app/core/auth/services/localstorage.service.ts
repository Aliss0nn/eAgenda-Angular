import { Injectable } from "@angular/core";
import { TokenViewModel } from "../models/token.view-model";

@Injectable()
export class LocalStorageService{
private chaveLocalStorage: string = 'e-agenda-dados';

public salvarDadosDoUsuario(usuario: TokenViewModel){
const jsonString = JSON.stringify(usuario);

localStorage.setItem(this.chaveLocalStorage,jsonString);
}

public obterDadosLocaisSalvos(){
const jsontring = localStorage.getItem(this.chaveLocalStorage);

if(!jsontring) return undefined;

return JSON.parse(jsontring) as TokenViewModel;
}
}