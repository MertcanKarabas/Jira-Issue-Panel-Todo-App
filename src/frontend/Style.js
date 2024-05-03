import { xcss } from "@forge/react";

export const textStyle = xcss({
    color: 'color.text',
    fontSize: 'fontSize.medium',
    fontWeight: 'fontWeight.medium',
    lineHeight: 'lineHeight.medium',
})

export const lineStyle = xcss({
    borderBottomStyle: 'solid',
    borderBottomWidth: 'border.width',
    borderBottomColor: 'color.border',
    padding: 'space.050',
})

export const newTodoStyle = xcss({
    padding: 'space.200',
})

export const deleteStyle = xcss({
    padding: 'space.0.25',
    ":hover": {
        backgroundColor: 'color.background.danger.hovered',
    }
})

export const cardStyle = xcss({
    backgroundColor: 'elevation.surface',
    borderColor: 'color.border',
    borderWidth: 'border.width',
    borderStyle: 'solid',
    borderRadius: 'border.radius',
    maxHeight: '300px',
    height: '300px',
  });