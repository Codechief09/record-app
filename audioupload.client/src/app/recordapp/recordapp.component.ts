import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';



const api = axios.create({
  baseURL: 'https://localhost:7183',
});

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './recordapp.component.html',
  styleUrl: './recordapp.component.css'
})
export class RecordappComponent {
  audioIndex = 0;
  isRecording = false;
  mediaRecorders: MediaRecorder[] = [];
  audioChunks: Blob[][] = [];
  audioFiles: File[] = [];
  formData = new FormData();

  flags: Number[] = [];
  responseUrls: string[] = [];

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {

        const mediaRecorder = new MediaRecorder(stream);
        const index = this.mediaRecorders.length;

        mediaRecorder.addEventListener('dataavailable', (event) => {
          if (event.data.size > 0) {
            this.audioChunks[index].push(event.data);
          }
        });
        mediaRecorder.start();
        this.mediaRecorders.push(mediaRecorder);
        this.audioChunks.push([]);
        this.isRecording = true;
        this.audioIndex++;
      })
      .catch((error) => {
        console.log('err');
        console.error(error);
      });
  }

  stopRecording() {
    if (this.mediaRecorders.length > 0) {
      const lastIndex = this.mediaRecorders.length - 1;
      this.mediaRecorders[lastIndex].stop();
      console.log(this.audioChunks);
      this.isRecording = false;
    }
    const audioBlob = new Blob(this.audioChunks[this.audioIndex - 1], { type: 'audio/wav' });
    const audioFile = new File([audioBlob], `recording${this.audioIndex}.wav`);
    this.formData.append(`recording${this.audioIndex}`, audioFile);
    saveAs(audioFile, `recording${this.audioIndex}.wav`);
  }

  async handleUpload() {
    try {
      await axios.post('/api/upload', this.formData).then(response => {
        console.log('Upload successful!');
        this.responseUrls = response.data;
      })
        .catch(error => {
          console.error('Error occurred while uploading files!', error);
        });
    } catch (error) {
      console.error(error);
    } finally {
      this.audioChunks = [];
      this.audioFiles = [];
    }
  }



}
