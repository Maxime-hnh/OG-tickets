package com.studi.OG_tickets.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ErrorObject> handleObjectNotFoundException(NotFoundException ex, WebRequest request) {
    ErrorObject errorObject = new ErrorObject();

    errorObject.setErrorCode(HttpStatus.NOT_FOUND.value());
    errorObject.setMessage(ex.getMessage());
    errorObject.setTimestamp(new Date());

    return new ResponseEntity<>(errorObject, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(InternalServerException.class)
  public ResponseEntity<ErrorObject> handleInternalServerException(InternalServerException ex, WebRequest request) {
    ErrorObject errorObject = new ErrorObject();
    errorObject.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
    errorObject.setMessage(ex.getMessage());
    errorObject.setTimestamp(new Date());

    return new ResponseEntity<>(errorObject, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<ErrorObject> handleBadRequestException(BadRequestException ex, WebRequest request) {
    ErrorObject errorObject = new ErrorObject();
    errorObject.setErrorCode(HttpStatus.BAD_REQUEST.value());
    errorObject.setMessage(ex.getMessage());
    errorObject.setTimestamp(new Date());

    return new ResponseEntity<>(errorObject, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorObject> handleGeneralException(Exception ex, WebRequest request) {
    ErrorObject errorObject = new ErrorObject();
    errorObject.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
    errorObject.setMessage("An unexpected error occurred: " + ex.getMessage());
    errorObject.setTimestamp(new Date());

    return new ResponseEntity<>(errorObject, HttpStatus.INTERNAL_SERVER_ERROR);
  }

}
