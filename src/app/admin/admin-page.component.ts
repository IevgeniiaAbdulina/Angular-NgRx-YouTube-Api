import { Component, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { createCustomVideoAction } from '../redux/actions/custom-video.actions';
import { CustomCard } from '../shared/models/custom-video-interface';
import { DataConverter } from '../youtube/services/data-converter.service';
import { CreationDateField } from './models/creation-date-field';
import { CustomVideoFormFields } from './models/creation-form';
import { DescriptionField } from './models/description-field';
import { ImageCoverLinkField } from './models/image-link-field';
import { TagsField } from './models/tags-field';
import { TitleField } from './models/title-field';
import { VideoLinkField } from './models/video-link-field';
import { ControlService } from './services/control.service';
import { CustomVideoService } from './services/custom-video.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  cardCreationForm!: FormGroup;
  maxDate = new Date().toISOString().split('T')[0];

  @Output() isDisabledButton?: boolean;

  formFields: CustomVideoFormFields = {
    title: new TitleField(),
    description: new DescriptionField(),
    imageCoverLink: new ImageCoverLinkField(),
    videoLink: new VideoLinkField(),
    creationDate: new CreationDateField(),
    tags: new TagsField()
  };

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private cardService: CustomVideoService
  ) {}

  ngOnInit(): void {
    this.cardCreationForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ],
      description: ['', Validators.maxLength(255)],
      imageCoverLink: ['', Validators.required],
      videoLink: ['', Validators.required],
      creationDate: [
        new Date().toISOString().substring(0, 10),
        Validators.required
      ],
      tags: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  validationChecks(control: AbstractControl): boolean | null {
    return ControlService.validationChecks(control);
  }

  getControlName(controlName: string): AbstractControl | null {
    return ControlService.getFormControl(this.cardCreationForm, controlName);
  }

  getFormArrayControl(arrayName: string): FormArray {
    return ControlService.getFormArray(this.cardCreationForm, arrayName);
  }

  addTag(): void {
    this.getFormArrayControl('tags').push(
      this.fb.control('', Validators.required)
    );
  }

  resetHandler(): void {
    this.cardCreationForm.reset();
    this.cardCreationForm
      .get('creationDate')
      ?.setValue(new Date().toISOString().substring(0, 10));
    this.getFormArrayControl('tags').clear();
    this.addTag();
  }

  submitHandler(): void {
    const formValue: CustomCard = this.cardCreationForm.value;
    if (this.cardCreationForm.invalid) return;

    const cardId: string = this.cardService.generateCustomVideoId();
    formValue.id = cardId;

    const createdCard = DataConverter.toVideoItem(formValue);

    this.store.dispatch(createCustomVideoAction({ customVideo: createdCard }));
    this.cardService.saveCustomVideoListInStorage(createdCard);

    this.resetHandler();
  }
}
