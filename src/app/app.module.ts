import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { GraphComponent } from './graph/graph.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { TableComponent } from './table/table.component';
import { AssetSectionComponent } from './asset-section/asset-section.component';
import { ImprintComponent } from './imprint/imprint.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    CalculatorComponent,
    GraphComponent,
    MenuComponent,
    FooterComponent,
    TableComponent,
    AssetSectionComponent,
    ImprintComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, 
    FormsModule,  
    NgChartsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
