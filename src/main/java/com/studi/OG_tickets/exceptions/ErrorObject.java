package com.studi.OG_tickets.exceptions;

import lombok.Data;
import java.util.Date;

@Data
public class ErrorObject {
  private Integer errorCode;
  private String message;
  private Date timestamp;
}
