import { Component, ComponentRef, signal, viewChild, ViewContainerRef } from '@angular/core';
import { SymbolsComponent } from '../components/symbols/symbols.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-external',
  imports: [FormsModule],
  templateUrl: './external.component.html',
  styleUrl: './external.component.css'
})
export class ExternalComponent {
  keyword = signal('');
  private _viewContainerRef = viewChild('symbolsContainer', {read: ViewContainerRef});
  private _stockDataComponentRef? : ComponentRef<SymbolsComponent>;
  
  getExternalSymbols(){
    this._stockDataComponentRef?.destroy();
    this._stockDataComponentRef = this._viewContainerRef()?.createComponent(SymbolsComponent);
    this._stockDataComponentRef?.setInput('keyword', this.keyword());
    this._stockDataComponentRef?.setInput('isForExternal', true);
  }
}
