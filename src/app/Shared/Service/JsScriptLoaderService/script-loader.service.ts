import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {

  loadScript(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => {
        resolve();
      };
      script.onerror = (error: any) => reject(error);
      document.head.appendChild(script);
    });
  }
}
