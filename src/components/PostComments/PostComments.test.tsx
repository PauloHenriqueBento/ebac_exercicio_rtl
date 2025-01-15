import { fireEvent, render, screen } from '@testing-library/react';
import Post from '.';
import PostComment from '.';

describe('Teste para o componente PostComment', () => {
    it('Deve renderizar o componente corretamente', () => {
        render(<PostComment/>);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    it('Deve permitir a inserção de dois comentários', () => {
        render(<Post />);

        const textarea = screen.getByTestId('comments-textarea');
        const submitButton = screen.getByTestId('comments-submit');
        const commentsList = screen.getByTestId('comments-list');

        fireEvent.change(textarea, { target: { value: 'Primeiro comentário' } });
        fireEvent.click(submitButton);
        expect(commentsList).toHaveTextContent('Primeiro comentário');

        fireEvent.change(textarea, { target: { value: 'Segundo comentário' } });
        fireEvent.click(submitButton);

        expect(commentsList).toHaveTextContent('Segundo comentário');

        const comments = screen.getAllByTestId(/^comment-/);
        expect(comments).toHaveLength(2);
    });
});