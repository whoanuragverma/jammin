import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeurl',
})
export class SafeurlPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}
  transform(value: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
}
