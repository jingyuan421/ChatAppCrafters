import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBarComponent } from './chat-bar.component';

import { Component, Renderer2 } from '@angular/core';

describe('ChatBarComponent', () => {
  let component: ChatBarComponent;
  let fixture: ComponentFixture<ChatBarComponent>;
  let renderer: Renderer2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBarComponent);
    component = fixture.componentInstance;
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should play sound', () => {
    spyOn(renderer, 'createElement').and.returnValue(new Audio() as HTMLAudioElement);
    spyOnProperty(component, 'soundPath', 'get').and.returnValue('path/to/sound.m4a');

    component.playSound();

    expect(renderer.createElement).toHaveBeenCalledWith('audio');
    expect(component.soundPath).toBe('path/to/sound.m4a');
  });
});
